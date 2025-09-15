#!/usr/bin/env node

/**
 * Performance Audit Script
 * This script helps identify and fix common performance issues
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Running Performance Audit...\n');

// Check for common performance issues
const issues = [];

// 1. Check for large images
function checkImages() {
  const publicDir = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
    );
    
    imageFiles.forEach(file => {
      const filePath = path.join(publicDir, file);
      const stats = fs.statSync(filePath);
      const sizeInKB = Math.round(stats.size / 1024);
      
      if (sizeInKB > 500) {
        issues.push({
          type: 'warning',
          message: `Large image detected: ${file} (${sizeInKB}KB)`,
          suggestion: 'Consider compressing or using WebP format'
        });
      }
    });
  }
}

// 2. Check for unused CSS classes
function checkUnusedCSS() {
  const cssFile = path.join(process.cwd(), 'src/app/globals-optimized.css');
  if (fs.existsSync(cssFile)) {
    const cssContent = fs.readFileSync(cssFile, 'utf8');
    const classMatches = cssContent.match(/\.([a-zA-Z0-9_-]+)/g) || [];
    const uniqueClasses = [...new Set(classMatches)];
    
    if (uniqueClasses.length > 100) {
      issues.push({
        type: 'info',
        message: `CSS file contains ${uniqueClasses.length} classes`,
        suggestion: 'Consider purging unused CSS classes'
      });
    }
  }
}

// 3. Check bundle size
function checkBundleSize() {
  const packageJson = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJson)) {
    const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
    const dependencies = Object.keys(pkg.dependencies || {});
    
    if (dependencies.length > 30) {
      issues.push({
        type: 'warning',
        message: `Large number of dependencies: ${dependencies.length}`,
        suggestion: 'Consider removing unused dependencies'
      });
    }
  }
}

// 4. Check for performance best practices
function checkBestPractices() {
  const nextConfig = path.join(process.cwd(), 'next.config.ts');
  if (fs.existsSync(nextConfig)) {
    const config = fs.readFileSync(nextConfig, 'utf8');
    
    if (!config.includes('swcMinify: true')) {
      issues.push({
        type: 'warning',
        message: 'SWC minification not enabled',
        suggestion: 'Add swcMinify: true to next.config.ts'
      });
    }
    
    if (!config.includes('compress: true')) {
      issues.push({
        type: 'warning',
        message: 'Compression not enabled',
        suggestion: 'Add compress: true to next.config.ts'
      });
    }
  }
}

// Run all checks
checkImages();
checkUnusedCSS();
checkBundleSize();
checkBestPractices();

// Display results
if (issues.length === 0) {
  console.log('✅ No performance issues found!');
} else {
  console.log(`Found ${issues.length} potential issues:\n`);
  
  issues.forEach((issue, index) => {
    const icon = issue.type === 'warning' ? '⚠️' : 'ℹ️';
    console.log(`${index + 1}. ${icon} ${issue.message}`);
    console.log(`   💡 ${issue.suggestion}\n`);
  });
}

// Performance recommendations
console.log('📋 Performance Recommendations:');
console.log('1. Use Next.js Image component with proper sizing');
console.log('2. Implement lazy loading for below-the-fold content');
console.log('3. Optimize images to WebP/AVIF format');
console.log('4. Use dynamic imports for large components');
console.log('5. Enable compression and caching headers');
console.log('6. Monitor Core Web Vitals regularly');
console.log('7. Use React.memo for expensive components');
console.log('8. Implement proper code splitting');

console.log('\n🚀 Performance audit complete!');

