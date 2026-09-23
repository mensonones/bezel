#!/usr/bin/env bash
set -e

# Bezel Android Emulator Runner (Idempotent)
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"

AVD_NAME="bezel"
TARGET_IMAGE="system-images;android-35;google_apis;x86_64"

echo "======================================================"
echo " BEZEL · Android Emulator Setup & Launcher"
echo "======================================================"
echo "Android SDK: $ANDROID_HOME"

# 1. Verify cmdline-tools
if [ ! -d "$ANDROID_HOME/cmdline-tools/latest" ]; then
  echo "Installing Android cmdline-tools..."
  mkdir -p "$ANDROID_HOME/cmdline-tools"
  TMP_ZIP="/tmp/cmdline-tools.zip"
  curl -fsSL "https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip" -o "$TMP_ZIP"
  unzip -q -o "$TMP_ZIP" -d "/tmp/cmdline-tools-extracted"
  mv "/tmp/cmdline-tools-extracted/cmdline-tools" "$ANDROID_HOME/cmdline-tools/latest"
  rm -rf "$TMP_ZIP" "/tmp/cmdline-tools-extracted"
fi

# 2. Check licenses & system image if needed
if [ ! -d "$ANDROID_HOME/system-images/android-35" ]; then
  echo "Installing Android 35 platform and system image..."
  yes | sdkmanager --licenses > /dev/null 2>&1 || true
  sdkmanager "platform-tools" "platforms;android-35" "$TARGET_IMAGE"
fi

# 3. Create AVD if missing
if ! avdmanager list avd 2>/dev/null | grep -q "Name: $AVD_NAME"; then
  echo "Creating AVD '$AVD_NAME' (Pixel 6 profile)..."
  echo "no" | avdmanager create avd -n "$AVD_NAME" -k "$TARGET_IMAGE" -d "pixel_6" --force
  echo "AVD '$AVD_NAME' created."
else
  echo "AVD '$AVD_NAME' already exists."
fi

# 4. Check if emulator is already running
if adb devices | grep -E "emulator-[0-9]+" | grep -q "device"; then
  BOOTED=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
  if [ "$BOOTED" = "1" ]; then
    echo "✔ Android emulator is ALREADY RUNNING and fully booted!"
    exit 0
  fi
fi

# 5. Launch emulator in background if not running
echo "Starting emulator @$AVD_NAME in background..."
nohup emulator -avd "$AVD_NAME" -gpu swiftshader_indirect -no-snapshot > /tmp/bezel-emulator.log 2>&1 &

echo "Waiting for emulator device connection..."
adb wait-for-device

echo "Waiting for Android system boot to complete..."
while [ "$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" != "1" ]; do
  sleep 2
done

echo "✔ Android emulator @$AVD_NAME is READY!"
