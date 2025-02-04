//Task 1 
console.log("hello") 
const fs = require('fs'); 
const path = require('path'); 
 
// Function to organize files in a directory on a small scale 
function organizeDirectory(dirPath) { 
  try { 
    // Check if the directory exists 
    if (!fs.existsSync(dirPath)) { 
      throw new Error(`Directory not found: ${dirPath}`); 
    } 
 
    // Define basic categories 
    const categories = { 
      Images: ['.jpg', '.jpeg', '.png'], 
      Documents: ['.pdf', '.txt'], 
      Others: [] 
    }; 
 
    // Helper to determine category 
    const getCategory = (extension) => { 
      for (const [category, extensions] of Object.entries(categories)) { 
        if (extensions.includes(extension.toLowerCase())) { 
          return category; 
        } 
      } 
      return 'Others'; 
    }; 
 
    // Read the directory contents 
    const files = fs.readdirSync(dirPath); 
 
    files.forEach((file) => { 
      const filePath = path.join(dirPath, file); 
 
      if (fs.statSync(filePath).isFile()) { 
        const fileExtension = path.extname(file); 
        const category = getCategory(fileExtension); 
        const categoryDir = path.join(dirPath, category); 
 
        // Create category folder if it doesn’t exist 
        if (!fs.existsSync(categoryDir)) { 
          fs.mkdirSync(categoryDir); 
        } 
 
        // Move file to category folder 
        const newFilePath = path.join(categoryDir, file); 
        fs.renameSync(filePath, newFilePath); 
        console.log(`Moved: ${file} -> ${category}/`); 
      } 
    }); 
 
    console.log('Directory organized successfully.'); 
  } catch (error) { 
    console.error('Error:', error.message); 
  } 
} 
 
// Get directory path from command-line arguments 
const dirPath = process.argv[2]; 
 
if (!dirPath) { 
  console.error('Please provide a directory path to organize.'); 
  process.exit(1); 
} 
 
organizeDirectory(path.resolve(dirPath));

const fs = require('fs'); 
const path = require('path'); 
 
// Function to copy a file from source to backup 
function copyFile(srcPath, destPath) { 
  return new Promise((resolve, reject) => { 
    const readStream = fs.createReadStream(srcPath); 
    const writeStream = fs.createWriteStream(destPath); 
    readStream.pipe(writeStream); 
 
    readStream.on('end', resolve); 
    readStream.on('error', reject); 
  }); 
} 
 
// Function to back up files from source to backup folder 
async function backupFiles(srcDir, backupDir) { 
  try { 
    // Ensure the backup folder exists 
    if (!fs.existsSync(backupDir)) { 
      fs.mkdirSync(backupDir); 
    } 
 
    const logStream = fs.createWriteStream(path.join(backupDir, 
'backup-log.txt'), { flags: 'a' }); 
 
    // Function to log details 
    const logDetails = (file, size, timestamp) => { 
      logStream.write(`File: ${file}\nSize: ${size} bytes\nTimestamp: 
${timestamp}\n\n`); 
    }; 
 
    // Read the source directory 
    const files = fs.readdirSync(srcDir); 
 
    for (const file of files) { 
      const srcFilePath = path.join(srcDir, file); 
      const destFilePath = path.join(backupDir, file); 
 
      const stats = fs.statSync(srcFilePath); 
 
      if (stats.isFile()) { 
        // Copy the file to the backup directory 
        await copyFile(srcFilePath, destFilePath); 
 
        // Log the file details 
        const timestamp = new Date().toISOString(); 
        logDetails(file, stats.size, timestamp); 
        console.log(`Backed up: ${file}`); 
      } 
    } 
 
    console.log('Backup operation completed.'); 
    logStream.end(); 
 
  } catch (error) { 
    console.error('Error during backup:', error.message); 
  } 
} 
 
// Main function to run the backup 
async function main() { 
  const srcDir = process.argv[2];  // Source directory from command-line 
argument 
  const backupDir = process.argv[3] || './backup';  // Backup directory, 
default is './backup' 
 
  if (!srcDir) { 
    console.error('Please provide a source directory.'); 
    process.exit(1); 
  } 
 
  // Start the backup process 
  await backupFiles(srcDir, backupDir); 
} 
 
// Run the main function 
main(); 
 

//Task 2
const os = require('os'); 
const fs = require('fs'); 
const path = require('path'); 
 
// Function to gather basic system info 
function getSystemInfo() { 
  return { 
    homeDirectory: os.homedir(), 
    hostname: os.hostname(), 
    networkInterfaces: os.networkInterfaces(), 
    environmentVariables: process.env 
  }; 
} 
 
// Function to save environment variables to a file 
function saveEnvDetails(info) { 
  const filePath = path.join(__dirname, 'env-details.json'); 
 
  try { 
    fs.writeFileSync(filePath, JSON.stringify(info, null, 2)); // Pretty 
print JSON 
    console.log(`Environment details saved to ${filePath}`); 
  } catch (error) { 
    console.error('Error writing to file:', error.message); 
  } 
} 
 
// Function to display system info on the console 
function displaySystemInfo() { 
  const info = getSystemInfo(); 
  console.log('Home Directory:', info.homeDirectory); 
  console.log('Hostname:', info.hostname); 
console.log('Network Interfaces:', 
JSON.stringify(info.networkInterfaces, null, 2)); 
console.log('Environment Variables:', 
JSON.stringify(info.environmentVariables, null, 2)); 
} 
// Main function to run the program 
function main() { 
displaySystemInfo(); 
saveEnvDetails(getSystemInfo());
