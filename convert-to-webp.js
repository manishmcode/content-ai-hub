const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const images = [
  {
    src: 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\43db241f-0c1d-4acf-aef6-0084f051d976\\nurse_hero_3d_1792047219383.jpg',
    dest: 'nurse-hero-3d.webp',
    width: 1200
  },
  {
    src: 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\43db241f-0c1d-4acf-aef6-0084f051d976\\cardiology_heart_3d_1792047248580.jpg',
    dest: 'cardiology-heart-3d.webp',
    width: 600
  },
  {
    src: 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\43db241f-0c1d-4acf-aef6-0084f051d976\\hero_girl_headphones_1792045683923.jpg',
    dest: 'hero-girl-headphones.webp',
    width: 1000
  },
  {
    src: 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\43db241f-0c1d-4acf-aef6-0084f051d976\\career_man_phone_1792045747124.jpg',
    dest: 'career-man-phone.webp',
    width: 800
  },
  {
    src: 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\43db241f-0c1d-4acf-aef6-0084f051d976\\student_john_smith_1792045770621.jpg',
    dest: 'student-john-smith.webp',
    width: 800
  },
  {
    src: 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\43db241f-0c1d-4acf-aef6-0084f051d976\\instructor_mentor_1792045793327.jpg',
    dest: 'instructor-mentor.webp',
    width: 800
  },
  {
    src: 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\43db241f-0c1d-4acf-aef6-0084f051d976\\course_photographer_1792045816506.jpg',
    dest: 'course-photographer.webp',
    width: 800
  },
  {
    src: 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\43db241f-0c1d-4acf-aef6-0084f051d976\\hero_student_mentor_1792040604901.jpg',
    dest: 'course-uiux.webp',
    width: 800
  },
  {
    src: 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\43db241f-0c1d-4acf-aef6-0084f051d976\\camera_gear_1792040640173.jpg',
    dest: 'course-camera.webp',
    width: 800
  },
  {
    src: 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\43db241f-0c1d-4acf-aef6-0084f051d976\\avatar_eva_1792040679562.jpg',
    dest: 'avatar-eva.webp',
    width: 200
  },
  {
    src: 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\43db241f-0c1d-4acf-aef6-0084f051d976\\avatar_mentor_1792040701437.jpg',
    dest: 'avatar-mentor.webp',
    width: 200
  }
];

const targetDirs = [
  path.join(__dirname, 'src', 'assets', 'images'),
  path.join(__dirname, 'public', 'images')
];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function convert() {
  for (const item of images) {
    if (!fs.existsSync(item.src)) {
      console.error(`File not found: ${item.src}`);
      continue;
    }
    for (const dir of targetDirs) {
      const outPath = path.join(dir, item.dest);
      await sharp(item.src)
        .resize({ width: item.width, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(outPath);
      console.log(`Converted and saved: ${outPath}`);
    }
  }
  console.log('All images converted to WebP successfully!');
}

convert().catch(err => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
