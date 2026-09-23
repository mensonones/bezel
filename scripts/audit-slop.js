#!/usr/bin/env node

/**
 * Bezel Slop Auditor (CLI)
 * Automatically evaluates mobile code against the Bezel Standard and 60 Quality Gates.
 *
 * Usage:
 *   node scripts/audit-slop.js <path-to-file.tsx>
 */

const fs = require('fs');
const path = require('path');

const targetFile = process.argv[2];

if (!targetFile) {
  console.error('\x1b[31mError: Please provide a file to audit.\x1b[0m');
  console.log('Usage: node scripts/audit-slop.js <path-to-file.tsx>');
  process.exit(1);
}

const fullPath = path.resolve(process.cwd(), targetFile);

if (!fs.existsSync(fullPath)) {
  console.error(`\x1b[31mError: File not found at ${fullPath}\x1b[0m`);
  process.exit(1);
}

const content = fs.readFileSync(fullPath, 'utf8');
const lines = content.split('\n');

const violations = [];

// 1. Check for Inline Styles (Gate 33)
const inlineStyleMatches = [];
lines.forEach((line, index) => {
  if (/style=\{\{/.test(line)) {
    inlineStyleMatches.push(index + 1);
  }
});
if (inlineStyleMatches.length > 0) {
  violations.push({
    gate: 'Gate 33 (Render Performance)',
    severity: 'CRITICAL',
    title: 'Inline Style Spaghetti Detected',
    lines: inlineStyleMatches,
    description: `Found ${inlineStyleMatches.length} inline style object(s). This causes garbage collection pauses and dropped frames on 120Hz displays. Use StyleSheet.create.`,
  });
}

// 2. Check for Floating Card Slop with Blurry Shadow (Gate 55 & 2)
let hasCardSlop = false;
const shadowLines = [];
lines.forEach((line, index) => {
  if (/shadowOpacity|shadowRadius|elevation:\s*[3-9]/.test(line)) {
    shadowLines.push(index + 1);
    hasCardSlop = true;
  }
});
if (hasCardSlop && shadowLines.length > 2) {
  violations.push({
    gate: 'Gate 55 (Anti-Card Slop)',
    severity: 'WARNING',
    title: 'Floating Card Fatigue Detected',
    lines: shadowLines,
    description: 'Multiple elements with generic blur shadows. Use Inset Grouped Tables with hairline dividers (0.5pt) instead.',
  });
}

// 3. Check for Safe Area Inset Handling (Gate 1 & 3)
const hasSafeArea = /useSafeAreaInsets|safeAreaInsets|WindowInsets|safeDrawing|safeAreaInset/.test(content);
const hasHardcodedTop = /paddingTop:\s*(40|44|48|50|54)/.test(content);
if (!hasSafeArea || hasHardcodedTop) {
  violations.push({
    gate: 'Gate 1 & 3 (Edge-to-Edge & Insets)',
    severity: 'CRITICAL',
    title: 'Boxed Viewport / Hardcoded Top Inset',
    lines: hasHardcodedTop ? ['Hardcoded padding'] : ['Root container'],
    description: 'Screen lacks dynamic safe area insets or hardcodes status bar padding. Backgrounds must bleed edge-to-edge.',
  });
}

// 4. Check for Tactile Touch & Haptics (Gate 19 & 21)
const hasHaptics = /Haptics\.(impactAsync|selectionAsync|notificationAsync)|performHapticFeedback|sensoryFeedback/.test(content);
const hasSpringTouch = /withSpring|animateFloatAsState|scale|TactilePressable/.test(content);
if (!hasHaptics || !hasSpringTouch) {
  violations.push({
    gate: 'Gate 19 & 21 (Tactility & Haptics)',
    severity: 'CRITICAL',
    title: 'Frozen Touch / Missing Haptics',
    lines: ['Touch handlers'],
    description: 'Buttons do not scale with spring physics on press (scale: 0.96) or lack native haptic feedback.',
  });
}

// 5. Check for Naked Centered Spinner (Gate 48)
const hasActivityIndicator = /<ActivityIndicator|<CircularProgressIndicator/.test(content);
const hasSkeleton = /Skeleton|shimmer|Shimmer/.test(content);
if (hasActivityIndicator && !hasSkeleton) {
  violations.push({
    gate: 'Gate 48 (Loading States)',
    severity: 'WARNING',
    title: 'The Naked Centered Spinner',
    lines: ['Loading branch'],
    description: 'Isolated activity spinner found without structural skeleton loaders. Mimic the geometry of real content.',
  });
}

// 6. Check for Tabular Numbers on Currency or Counters (Gate 43)
const hasCurrency = /\$|\bUSD\b|\bR\$|\bEUR\b|\b[0-9]+(:[0-9]+)+/.test(content);
const hasTabularNums = /fontVariant:\s*\[.*tabular-nums.*\]|tnum|monospacedDigit/.test(content);
if (hasCurrency && !hasTabularNums) {
  violations.push({
    gate: 'Gate 43 (Typography)',
    severity: 'WARNING',
    title: 'Missing Tabular Figures (Number Jitter)',
    lines: ['Currency / Time text'],
    description: 'Currency or dynamic counters without tabular-nums. This causes horizontal layout jitter as digits update.',
  });
}

// 7. Check for Slop Microcopy (Copy Bans)
const slopWords = [/\bOops\b/i, /\bSomething went wrong\b/i, /\bClick here\b/i, /\bUh oh\b/i];
const foundSlopWords = [];
lines.forEach((line, index) => {
  slopWords.forEach((regex) => {
    if (regex.test(line)) {
      foundSlopWords.push({ line: index + 1, word: line.trim() });
    }
  });
});
if (foundSlopWords.length > 0) {
  violations.push({
    gate: 'Gate 59 (Honest Copy & Voice)',
    severity: 'WARNING',
    title: 'Slop Microcopy Detected',
    lines: foundSlopWords.map(w => `Line ${w.line}: "${w.word}"`),
    description: 'Banned stock copy detected. Errors must be specific instructions, not vague apologies.',
  });
}

// Calculate Scores
let T = hasHaptics && hasSpringTouch ? 5 : 1;
let B = hasSafeArea && !hasHardcodedTop ? 5 : 2;
let P = inlineStyleMatches.length === 0 ? 5 : Math.max(1, 5 - inlineStyleMatches.length);
let H = !hasCardSlop ? 5 : 2;
let G = hasSpringTouch ? 5 : 2;
let R = foundSlopWords.length === 0 ? 5 : 2;

const isPass = T >= 4 && B >= 4 && P >= 4 && H >= 4 && G >= 4 && R >= 4;

// Output Report
console.log('\n======================================================');
console.log(` \x1b[1mBEZEL SLOP AUDITOR\x1b[0m · ${path.basename(targetFile)}`);
console.log('======================================================\n');

console.log(`Pre-Emit Critique Score: \x1b[1mT${T} B${B} P${P} H${H} G${G} R${R}\x1b[0m`);
console.log(`Result: ${isPass ? '\x1b[32m✔ PASSED BEZEL CRAFT STANDARD\x1b[0m' : '\x1b[31m✖ FAILED (MOBILE AI-SLOP DETECTED)\x1b[0m'}\n`);

if (violations.length === 0) {
  console.log('\x1b[32m✨ Zero AI-slop detected! Code is production-ready, performant, and tactile.\x1b[0m\n');
} else {
  console.log(`Found \x1b[31m${violations.length} violation(s)\x1b[0m against Bezel Quality Gates:\n`);

  violations.forEach((v, idx) => {
    const color = v.severity === 'CRITICAL' ? '\x1b[31m' : '\x1b[33m';
    console.log(`${idx + 1}. ${color}[${v.severity}] ${v.title}\x1b[0m`);
    console.log(`   ${v.gate}`);
    console.log(`   Lines: ${Array.isArray(v.lines) ? v.lines.slice(0, 5).join(', ') : v.lines}`);
    console.log(`   Fix: ${v.description}\n`);
  });
}

process.exit(isPass ? 0 : 1);
