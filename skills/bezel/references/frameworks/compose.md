# Jetpack Compose Implementation Guide

This guide defines idiomatic Kotlin and Jetpack Compose patterns that adhere to the Bezel standard.

---

## 1. Recomposition Stability & State Hoisting

### Stable Lambdas and Keys
When using `LazyColumn`, always provide explicit stable keys and avoid allocating unstable lambdas inside the item emitter:

```kotlin
// ✅ BEZEL: Explicit stable keys and hoisted event handlers
LazyColumn(
    contentPadding = PaddingValues(
        top = WindowInsets.safeDrawing.asPaddingValues().calculateTopPadding() + 16.dp,
        bottom = WindowInsets.safeDrawing.asPaddingValues().calculateBottomPadding() + 24.dp
    )
) {
    items(
        items = feedItems,
        key = { it.id }
    ) { item ->
        FeedRow(
            item = item,
            onClick = onSelectItem // Hoisted lambda reference
        )
    }
}
```

---

## 2. Tactile Pressable with Spring Physics & Haptics

```kotlin
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.unit.dp

@Composable
fun TactilePressable(
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()
    val haptic = LocalHapticFeedback.current

    LaunchedEffect(isPressed) {
        if (isPressed) {
            haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove)
        }
    }

    val scale by animateFloatAsState(
        targetValue = if (isPressed) 0.96f else 1.0f,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessMedium
        ),
        label = "tactileScale"
    )

    Box(
        modifier = modifier
            .defaultMinSize(minWidth = 48.dp, minHeight = 48.dp) // Android min target
            .graphicsLayer {
                scaleX = scale
                scaleY = scale
            }
            .clickable(
                interactionSource = interactionSource,
                indication = null, // Custom spring replaces flat ripple
                onClick = onClick
            )
    ) {
        content()
    }
}
```

---

## 3. Inset & Keyboard Padding

```kotlin
// Keyboard IME avoidance in Compose
Modifier
    .fillMaxSize()
    .imePadding() // Automatically offsets above keyboard
    .windowInsetsPadding(WindowInsets.safeDrawing.only(WindowInsetsSides.Horizontal))
```
