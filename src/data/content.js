// THE single editable data file for the whole site.
// All copy below is transcribed verbatim from content.md.
// Any field left as an empty string ("") or empty array is not rendered.
// There is intentionally no phone number anywhere on the site.

export const profile = {
  name: 'Suraj Lohia',
  title: 'Cybersecurity Engineer (fresh graduate)',
  tagline: 'Cybersecurity Engineer. Built for speed, secured by design.',
  location: 'Mumbai, India',
  educationSummary: 'B.E. CSE, SIES GST',
  email: 'surajlohia2@gmail.com',
  github: 'https://github.com/UNKNOWN69x0',
  linkedin: 'https://www.linkedin.com/in/surajlohia/',
  resumeUrl: '/Suraj_Lohia_Resume.pdf',
}

export const about =
  'Computer Science graduate with a strong interest in cybersecurity and a hands-on approach to learning. Enjoys breaking problems down, building things to understand how they work, and picking up new tools and technologies quickly. Curious, adaptable and comfortable working in a team, with a drive to keep learning, take on new challenges and grow while contributing to real work.'

export const projects = [
  {
    title: 'Self-Healing Cybersecurity System (ML-Based IDS)',
    year: '2026',
    stack: ['Python', 'scikit-learn', 'Random Forest', 'psutil', 'WMI'],
    description:
      'Windows-based intrusion detection system that monitors CPU, memory, processes, network activity and login events in real time using psutil and WMI, with a live dashboard and event logging. Implements automated self-healing responses: terminating suspicious processes, blocking malicious IPs, updating firewall rules and raising alerts. Team project; I co-authored the project report.',
    model:
      'Random Forest classifier (100 trees) trained on the UNSW-NB15 dataset, 80:20 train-test split, with label encoding, normalization and feature-importance-based selection.',
    keyResult: '94.51% accuracy',
    link: '',
    pipeline: [],
  },
  {
    title: 'EduCertify: Blockchain Document Verifier',
    year: '2025',
    stack: ['Solidity', 'Web3.js', 'JavaScript', 'MetaMask'],
    description:
      "Decentralized app to store and verify the authenticity of student documents using SHA-256 hashes recorded on an Ethereum-compatible blockchain. Solidity smart contract with admin-only upload access control and a public verification function that checks a document hash against a student's address. Hashes are computed in the browser with the Web Crypto API; MetaMask integrated via Web3.js; tested on a local Ganache network and Remix IDE.",
    model: '',
    keyResult: 'Working end-to-end prototype (upload, hash, verify)',
    link: '',
    // Build-pipeline steps, summarised from the description above.
    pipeline: [
      { label: 'Hash', detail: 'SHA-256 in the browser with the Web Crypto API' },
      { label: 'Connect', detail: 'MetaMask integrated via Web3.js' },
      { label: 'Record', detail: 'Solidity smart contract with admin-only upload' },
      { label: 'Verify', detail: "Public check of a hash against a student's address" },
    ],
  },
  {
    title: 'SafetyApp',
    year: 'Jul to Oct 2024',
    stack: ['Mobile App', 'Firebase', 'Google Maps API'],
    description:
      "Prototype mobile safety app that lets users send instant emergency alerts to authorities, with dedicated buttons for different emergency situations. Google Maps API shares the user's live location in real time with the respective department when an alert is sent. Two-app system: one app for users to trigger alerts and one for departments to receive and respond, with Firebase Authentication. Team project (4 members).",
    model: '',
    keyResult: 'Working two-app prototype with live location sharing',
    link: '',
    // Build-pipeline steps, summarised from the description above.
    pipeline: [
      { label: 'Sign in', detail: 'Firebase Authentication' },
      { label: 'Alert', detail: 'Dedicated buttons for different emergencies' },
      { label: 'Locate', detail: 'Live location shared with the Google Maps API' },
      { label: 'Respond', detail: 'Department app receives and responds' },
    ],
  },
]

// Tyre theme grouping (suggested in content.md; edit freely).
export const skillCompounds = [
  {
    id: 'soft',
    label: 'Soft',
    note: 'strongest',
    items: ['Python', 'Web Exploitation', 'Cryptography'],
  },
  {
    id: 'medium',
    label: 'Medium',
    note: 'comfortable',
    items: [
      'JavaScript',
      'HTML/CSS',
      'scikit-learn',
      'Random Forest',
      'Digital Forensics',
      'Steganography',
      'OSINT',
      'Git/GitHub',
    ],
  },
  {
    id: 'hard',
    label: 'Hard',
    note: 'learning',
    items: [
      'Solidity',
      'Web3.js',
      'Reverse Engineering',
      'Windows Event Logs',
      'WMI',
      'psutil',
      'Remix IDE',
      'Ganache',
      'MetaMask',
    ],
  },
]

// Full list from resume.
export const skillCategories = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'Solidity', 'HTML/CSS'] },
  {
    label: 'Security',
    items: [
      'Cryptography',
      'Web Exploitation',
      'Reverse Engineering',
      'Digital Forensics',
      'Steganography',
      'OSINT',
    ],
  },
  {
    label: 'ML & Systems',
    items: ['scikit-learn', 'Random Forest', 'psutil', 'WMI', 'Windows Event Logs'],
  },
  {
    label: 'Blockchain & Tools',
    items: ['Web3.js', 'MetaMask', 'Remix IDE', 'Ganache', 'Git/GitHub'],
  },
]

export const education = [
  {
    degree: 'B.E. Computer Science & Engineering (IoT & Cybersecurity incl. Blockchain Technology)',
    school: 'SIES Graduate School of Technology',
    location: 'Navi Mumbai',
    years: '2022 to 2026',
  },
  {
    degree: 'Class XII (CBSE)',
    school: 'DAV Public School Nerul',
    location: 'Navi Mumbai',
    years: '2022',
    score: '85.6%',
  },
  {
    degree: 'Class X (CBSE)',
    school: 'DAV Public School Nerul',
    location: 'Navi Mumbai',
    years: '2020',
    score: '93.6%',
  },
]

export const experience = [
  {
    title: "X'ploitathon CTF",
    org: 'CSE Department, SIES GST',
    year: '2025',
    description:
      'Competed in a Capture-the-Flag cybersecurity contest, solving time-bound challenges in cryptography, steganography, reverse engineering, web exploitation, OSINT and forensics.',
  },
]

// Race calendar (timeline) order, exactly as given in content.md.
export const timeline = [
  { round: 1, label: 'Class X', year: '2020' },
  { round: 2, label: 'Class XII', year: '2022' },
  { round: 3, label: 'B.E. begins', year: '2022' },
  { round: 4, label: 'SafetyApp', year: '2024' },
  { round: 5, label: 'EduCertify', year: '2025' },
  { round: 6, label: "X'ploitathon CTF", year: '2025' },
  { round: 7, label: 'Self-Healing IDS', year: '2026' },
  { round: 8, label: 'Graduation', year: '2026' },
]

// Site structure: section ids, nav labels and heading copy (theme labels, not personal content).
export const sections = [
  { id: 'hero', nav: 'Start', sector: 'S0', eyebrow: 'Lights out', title: 'Home' },
  { id: 'about', nav: 'About', sector: 'S1', eyebrow: 'Driver profile', title: 'About' },
  { id: 'projects', nav: 'Projects', sector: 'S2', eyebrow: 'Race results', title: 'Projects' },
  { id: 'skills', nav: 'Skills', sector: 'S3', eyebrow: 'Tyre strategy', title: 'Skills' },
  {
    id: 'journey',
    nav: 'Journey',
    sector: 'S4',
    eyebrow: 'Race calendar',
    title: 'Experience & Education',
  },
  { id: 'contact', nav: 'Contact', sector: 'S5', eyebrow: 'Radio check', title: 'Contact' },
]
