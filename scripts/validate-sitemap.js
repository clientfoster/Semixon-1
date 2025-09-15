#!/usr/bin/env node

/**
 * Sitemap Validation Script
 * This script validates your sitemap for Google Search Console compatibility
 */

const https = require('https');
const http = require('http');

console.log('🔍 Validating Sitemap for Google Search Console...\n');

const baseUrl = 'https://semixion.com';
const sitemapUrl = `${baseUrl}/sitemap.xml`;

function validateSitemap(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ status: res.statusCode, data });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function validateXMLStructure(xml) {
  const issues = [];
  
  // Check for proper XML declaration
  if (!xml.startsWith('<?xml')) {
    issues.push('❌ Missing XML declaration');
  }
  
  // Check for proper namespace
  if (!xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    issues.push('❌ Missing sitemap namespace');
  }
  
  // Check for URL count
  const urlMatches = xml.match(/<url>/g);
  const urlCount = urlMatches ? urlMatches.length : 0;
  
  if (urlCount === 0) {
    issues.push('❌ No URLs found in sitemap');
  } else {
    console.log(`✅ Found ${urlCount} URLs in sitemap`);
  }
  
  // Check for required elements
  const requiredElements = ['<loc>', '<lastmod>', '<changefreq>', '<priority>'];
  requiredElements.forEach(element => {
    if (!xml.includes(element)) {
      issues.push(`❌ Missing required element: ${element}`);
    }
  });
  
  // Check for proper URL format
  const urlPattern = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let match;
  let validUrls = 0;
  let invalidUrls = 0;
  
  while ((match = urlPattern.exec(xml)) !== null) {
    const url = match[1];
    if (url.startsWith(baseUrl) && url.length > baseUrl.length) {
      validUrls++;
    } else {
      invalidUrls++;
      issues.push(`❌ Invalid URL format: ${url}`);
    }
  }
  
  if (validUrls > 0) {
    console.log(`✅ Found ${validUrls} valid URLs`);
  }
  
  if (invalidUrls > 0) {
    console.log(`❌ Found ${invalidUrls} invalid URLs`);
  }
  
  return issues;
}

function checkRobotsTxt() {
  return new Promise((resolve, reject) => {
    const robotsUrl = `${baseUrl}/robots.txt`;
    
    http.get(robotsUrl, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          const hasSitemap = data.includes('Sitemap:');
          const hasCorrectSitemap = data.includes('sitemap.xml');
          
          if (hasSitemap && hasCorrectSitemap) {
            console.log('✅ Robots.txt contains sitemap reference');
            resolve(true);
          } else {
            console.log('❌ Robots.txt missing or incorrect sitemap reference');
            resolve(false);
          }
        } else {
          console.log('❌ Could not access robots.txt');
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log('❌ Error accessing robots.txt:', err.message);
      resolve(false);
    });
  });
}

async function runValidation() {
  try {
    console.log('1. Checking sitemap accessibility...');
    const sitemapResult = await validateSitemap(sitemapUrl);
    console.log('✅ Sitemap is accessible');
    
    console.log('\n2. Validating XML structure...');
    const issues = validateXMLStructure(sitemapResult.data);
    
    if (issues.length === 0) {
      console.log('✅ XML structure is valid');
    } else {
      console.log('❌ XML structure issues found:');
      issues.forEach(issue => console.log(`   ${issue}`));
    }
    
    console.log('\n3. Checking robots.txt...');
    const robotsOk = await checkRobotsTxt();
    
    console.log('\n4. Google Search Console Recommendations:');
    console.log('   • Submit sitemap at: https://search.google.com/search-console');
    console.log('   • Sitemap URL: ' + sitemapUrl);
    console.log('   • Monitor indexing progress regularly');
    console.log('   • Check for coverage issues weekly');
    
    console.log('\n5. Next Steps:');
    console.log('   • Verify your website in Google Search Console');
    console.log('   • Submit the sitemap URL');
    console.log('   • Monitor the "Sitemaps" section for status updates');
    console.log('   • Check "Coverage" for indexing issues');
    
    if (issues.length === 0 && robotsOk) {
      console.log('\n🎉 Sitemap validation passed! Ready for Google Search Console.');
    } else {
      console.log('\n⚠️  Please fix the issues above before submitting to Google Search Console.');
    }
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('   • Ensure your site is deployed and accessible');
    console.log('   • Check that sitemap.xml is generated correctly');
    console.log('   • Verify your domain is properly configured');
  }
}

runValidation();
