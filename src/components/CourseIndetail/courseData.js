// Master course data for all 14 detailed course pages
export const courseData = {
    'ethical-hacking': {
        slug: 'ethical-hacking',
        title: 'Ethical Hacking',
        category: 'Cyber Security',
        trending: true,
        difficulty: 'Intermediate',
        duration: '12 Weeks',
        rating: '4.9 (1,840+ reviews)',
        enrolled: '2,400+ enrolled',
        tagline: 'Master offensive security, exploit systems like a hacker, and defend them like a professional.',
        overview: 'Dive deep into the world of offensive security. This course takes you from fundamentals to advanced exploits, training you to think, scan, and breach systems exactly like a malicious attacker, so you can construct iron-clad defenses. You will conduct active penetration testing, learn intelligence gathering, explore malware mechanisms, and prepare for elite certifications like the CEH and OSCP.',
        prerequisites: 'Basic understanding of operating systems (Linux/Windows) and networking principles.',
        outcomes: [
            'Master foot-printing, network scanning, and reconnaissance methodology.',
            'Gain hands-on proficiency in system exploitation, privilege escalation, and lateral movement.',
            'Understand wireless hacking, cryptography vulnerabilities, and web application security auditing.',
            'Write comprehensive penetration testing reports and implement vulnerability remediations.'
        ],
        tools: ['Nmap', 'Wireshark', 'Metasploit', 'Burp Suite', 'John the Ripper', 'Kali Linux'],
        syllabus: [
            {
                title: 'Module 1: Information Gathering & Reconnaissance',
                topics: ['OSINT & Public Intelligence gathering', 'Advanced port scanning techniques with Nmap', 'Active & Passive DNS enumeration']
            },
            {
                title: 'Module 2: System Auditing & Exploitation',
                topics: ['Vulnerability assessment and prioritization', 'Exploit generation using Metasploit Framework', 'Privilege escalation in Windows and Linux']
            },
            {
                title: 'Module 3: Web App and Network Intrusion',
                topics: ['OWASP Top 10 web vulnerabilities testing', 'Wireless network handshake capture & cracking', 'Man-in-the-Middle (MitM) sniffing scenarios']
            },
            {
                title: 'Module 4: Post-Exploitation & Reporting',
                topics: ['Credential dumping and hash cracking', 'Maintaining access & writing reverse shells', 'Drafting executive summaries & technical reports']
            }
        ],
        careerRoles: [
            { role: 'Junior Penetration Tester', salary: '$85,000 / year' },
            { role: 'Security Analyst / Auditor', salary: '$92,000 / year' },
            { role: 'Offensive Security Consultant', salary: '$105,000 / year' }
        ]
    },
    'penetration-testing': {
        slug: 'penetration-testing',
        title: 'Penetration Testing',
        category: 'Cyber Security',
        trending: false,
        difficulty: 'Advanced',
        duration: '10 Weeks',
        rating: '4.8 (1,120+ reviews)',
        enrolled: '1,200+ enrolled',
        tagline: 'Run realistic breach simulations on enterprise networks, exploit Active Directory, and build security playbooks.',
        overview: 'This advanced course transitions you from single-host hacking to comprehensive enterprise-wide penetration testing. You will master Active Directory infrastructure exploitation, pivoting across multiple subnets, and evading modern Endpoint Detection & Response (EDR) systems. It is a fully simulated, hands-on enterprise deployment experience designed to prepare you for actual corporate security audits.',
        prerequisites: 'Prior security scanning experience, basic scripting, and network administration knowledge.',
        outcomes: [
            'Design and execute comprehensive corporate network infrastructure assessments.',
            'Compromise and secure multi-domain Active Directory environments.',
            'Pivot traffic through internal firewalls using secure SSH and proxy tunnels.',
            'Deploy defense-evasion mechanisms to bypass basic antivirus security.'
        ],
        tools: ['BloodHound', 'CrackMapExec', 'Mimikatz', 'Chisel', 'Cobalt Strike', 'Responder'],
        syllabus: [
            {
                title: 'Module 1: Active Directory Recon & Attack Vectors',
                topics: ['Kerberoasting & AS-REP Roasting', 'BloodHound path analysis & GPO abuse', 'Pass-the-Hash & Pass-the-Ticket attacks']
            },
            {
                title: 'Module 2: Network Pivoting & Subnet Traversal',
                topics: ['Chisel and proxychains routing', 'Double-pivoting into segmented environments', 'Lateral movement across Workgroups and Domains']
            },
            {
                title: 'Module 3: Evasion & Payload Delivery',
                topics: ['Bypassing signature-based Antivirus engines', 'Encoding and obfuscating shellcodes', 'LOLBAS (Living Off the Land Binaries) usage']
            },
            {
                title: 'Module 4: Professional Audit Deliverables',
                topics: ['Defining rules of engagement (RoE)', 'CVSS calculation and risk matrixing', 'Drafting client mitigation strategies']
            }
        ],
        careerRoles: [
            { role: 'Lead Penetration Tester', salary: '$120,000 / year' },
            { role: 'Infrastructure Security Engineer', salary: '$115,000 / year' },
            { role: 'AD Security Specialist', salary: '$125,000 / year' }
        ]
    },
    'red-teaming': {
        slug: 'red-teaming',
        title: 'Red Teaming',
        category: 'Cyber Security',
        trending: false,
        difficulty: 'Advanced',
        duration: '14 Weeks',
        rating: '4.9 (980+ reviews)',
        enrolled: '950+ enrolled',
        tagline: 'Emulate real-world threat actors, deploy stealth Command & Control infrastructure, and test organizational resilience.',
        overview: 'Become an elite Red Teamer. This intense curriculum covers adversarial emulation, stealth persistence, custom payload design, and operational security (OPSEC). You will learn how to bypass security operations centers (SOC), test physical and digital thresholds, deploy command and control (C2) servers in the cloud, and build highly realistic emulation matrices to test defensive Blue Teams.',
        prerequisites: 'Strong penetration testing skills, operating system internals (APIs), and networking command.',
        outcomes: [
            'Set up resilient Command & Control (C2) redirects and fronting systems.',
            'Bypass Windows Defender, AMSI, and modern EDR detection engines.',
            'Establish secure, long-term persistence within targeted networks.',
            'Coordinate full adversarial campaigns utilizing MITRE ATT&CK frameworks.'
        ],
        tools: ['Sliver', 'Havoc C2', 'Covenant', 'Mythic', 'Gophish', 'Sysmon'],
        syllabus: [
            {
                title: 'Module 1: Adversary Emulation & Setup',
                topics: ['Red Team operational design & planning', 'C2 Infrastructure provisioning & domain fronting', 'Creating hidden listeners & redirectors']
            },
            {
                title: 'Module 2: Endpoint Evasion & Shellcode Loader design',
                topics: ['Bypassing AMSI (Antimalware Scan Interface)', 'API unhooking and indirect system calls', 'Process injection & hollow techniques']
            },
            {
                title: 'Module 3: Phishing campaigns & Credential harvesting',
                topics: ['GoPhish configuration & custom templates', '2FA bypass with reverse proxies (Evilginx)', 'Crafting macro-enabled payloads']
            },
            {
                title: 'Module 4: Persistence, Exfiltration & Reporting',
                topics: ['Scheduled tasks and WMI persistence triggers', 'Encrypted data exfiltration channels', 'Debriefing the Blue Team & Purple Team workshops']
            }
        ],
        careerRoles: [
            { role: 'Red Team Operator', salary: '$135,000 / year' },
            { role: 'Adversary Emulation Lead', salary: '$145,000 / year' },
            { role: 'Cyber Threat Hunter', salary: '$128,000 / year' }
        ]
    },
    'network-security': {
        slug: 'network-security',
        title: 'Network Security',
        category: 'Cyber Security',
        trending: false,
        difficulty: 'Intermediate',
        duration: '8 Weeks',
        rating: '4.7 (1,340+ reviews)',
        enrolled: '1,500+ enrolled',
        tagline: 'Configure bulletproof network defenses, audit routing protocols, and inspect packet-level anomalies.',
        overview: 'Fortify the boundaries of modern corporate infrastructures. This course focuses on securing routing protocols, configuring enterprise-grade firewalls, deploying Intrusion Detection/Prevention Systems (IDS/IPS), and executing packet analysis. You will build and test defensive architectures against advanced network-based attacks.',
        prerequisites: 'CCNA level networking concepts, IP subnets, routing protocols, and packet headers.',
        outcomes: [
            'Audit and secure Layer 2 and Layer 3 networking infrastructures.',
            'Design and write firewall policies, VPN tunnels, and NAT access lists.',
            'Deploy and tune Snort IDS/IPS for real-time anomalous traffic alert filters.',
            'Perform packet-level packet analysis using Wireshark for incident response.'
        ],
        tools: ['Wireshark', 'PFSense', 'Snort', 'GNS3', 'Cisco ASA', 'Suricata'],
        syllabus: [
            {
                title: 'Module 1: Enterprise Firewall Deployment & VPNs',
                topics: ['Stateful packet inspection firewall policies', 'Configuring IPsec and SSL VPN client tunnels', 'Network Address Translation configurations']
            },
            {
                title: 'Module 2: Secure Routing & Switching',
                topics: ['Mitigating ARP spoofing & MAC flooding', 'Configuring SSH, AAA, and dynamic routing secure logs', 'VLAN design and 802.1X NAC deployments']
            },
            {
                title: 'Module 3: Traffic Inspection & Auditing',
                topics: ['Writing Snort and Suricata rules', 'Decrypting and analyzing network packages', 'Network performance baseline profiling']
            },
            {
                title: 'Module 4: Zero Trust & Modern Network Architectures',
                topics: ['Microsegmentation implementations', 'Software-Defined Perimeter (SDP) principles', 'Auditing cloud network routing interfaces']
            }
        ],
        careerRoles: [
            { role: 'Network Security Engineer', salary: '$95,000 / year' },
            { role: 'Systems & Network Admin', salary: '$85,000 / year' },
            { role: 'SOC Infrastructure Specialist', salary: '$98,000 / year' }
        ]
    },
    'cloud-security': {
        slug: 'cloud-security',
        title: 'Cloud Security',
        category: 'Cyber Security',
        trending: false,
        difficulty: 'Intermediate',
        duration: '10 Weeks',
        rating: '4.8 (1,560+ reviews)',
        enrolled: '1,800+ enrolled',
        tagline: 'Secure serverless computing, protect Kubernetes clusters, and automate compliance audits across AWS, Azure, and GCP.',
        overview: 'Transition to secure cloud computing. This curriculum focuses on locking down Identity and Access Management (IAM), containerized microservices in Kubernetes, and automated continuous compliance across AWS, Azure, and GCP platforms. You will learn to perform vulnerability audits on Infrastructure-as-Code scripts and secure cloud deployments.',
        prerequisites: 'Basic knowledge of cloud environments (AWS/Azure/GCP) and container concepts.',
        outcomes: [
            'Implement Least Privilege access control policy trees in IAM.',
            'Perform static and dynamic security analysis on Docker and Kubernetes configurations.',
            'Write and secure Terraform Infrastructure-as-Code modules.',
            'Automate threat detection alerts utilizing native cloud logging pipelines.'
        ],
        tools: ['Terraform', 'Docker', 'Kubernetes', 'AWS IAM', 'Trivy', 'Checkov'],
        syllabus: [
            {
                title: 'Module 1: IAM Governance & Principle of Least Privilege',
                topics: ['Writing secure IAM policies', 'Cross-account access and role assumption best practices', 'Federated identity & SSO configurations']
            },
            {
                title: 'Module 2: Infrastructure as Code (IaC) Auditing',
                topics: ['Static code analysis with Checkov and TFSec', 'Managing secrets securely using HashiCorp Vault', 'Securing Terraform remote state repositories']
            },
            {
                title: 'Module 3: Container & Orchestration Security',
                topics: ['Docker image vulnerability scanning with Trivy', 'Kubernetes network policies & API server access control', 'Implementing service meshes safely']
            },
            {
                title: 'Module 4: Cloud Logging, Monitoring & Incident Response',
                topics: ['Configuring AWS CloudTrail & GuardDuty systems', 'Aggregating logs into centralized security pipelines', 'Automated cloud incident remediation scripts']
            }
        ],
        careerRoles: [
            { role: 'Cloud Security Engineer', salary: '$122,000 / year' },
            { role: 'DevSecOps Architect', salary: '$130,000 / year' },
            { role: 'Cloud Compliance Auditor', salary: '$110,000 / year' }
        ]
    },
    'python-for-security': {
        slug: 'python-for-security',
        title: 'Python for Security',
        category: 'Programming',
        trending: true,
        difficulty: 'Intermediate',
        duration: '8 Weeks',
        rating: '4.8 (1,920+ reviews)',
        enrolled: '2,200+ enrolled',
        tagline: 'Develop custom security tools, automate vulnerability scanner scripts, and parse complex log formats.',
        overview: 'Python is the language of security automation. This highly tactical coding course covers socket programming, network packet sniffing, exploiting APIs, generating automated PDF vulnerability reports, and parsing security logs at scale. You will build raw scanners, custom backdoors, and threat intelligence aggregators from scratch.',
        prerequisites: 'Basic programming concepts (variables, loops, and functions in any language).',
        outcomes: [
            'Write robust multi-threaded port scanners and directory busters.',
            'Sniff, parse, and craft custom TCP/IP packets using Scapy.',
            'Automate API interactions with tools like VirusTotal and Shodan.',
            'Develop secure scripting scripts to parse large server event logs.'
        ],
        tools: ['Python 3', 'Scapy', 'Requests', 'BeautifulSoup', 'Shodan API', 'Pandas'],
        syllabus: [
            {
                title: 'Module 1: Socket Programming & Scanners',
                topics: ['Creating TCP/UDP client and server nodes', 'Writing multi-threaded port scanners', 'Banner grabbing & service identifier scripts']
            },
            {
                title: 'Module 2: Packet Crafting and Network Sniffing',
                topics: ['Interpreting OSI layers with Scapy', 'Writing automated ARP poisoning triggers', 'Parsing raw PCAP capture files programmatically']
            },
            {
                title: 'Module 3: API Auditing & Threat Intelligence Scripts',
                topics: ['Interfacing with Shodan and Censys endpoints', 'Automated hash verification with VirusTotal API', 'Web page scraping for target intelligence extraction']
            },
            {
                title: 'Module 4: Defense Automation & Log Processing',
                topics: ['Parsing Nginx/Apache logs using regular expressions', 'Automated blocking trigger generation on PfSense', 'Generating security summary dashboards with Pandas']
            }
        ],
        careerRoles: [
            { role: 'Security Automation Engineer', salary: '$108,000 / year' },
            { role: 'Threat Intelligence Scripting Dev', salary: '$102,000 / year' },
            { role: 'Security Software Engineer', salary: '$115,000 / year' }
        ]
    },
    'c-cpp': {
        slug: 'c-cpp',
        title: 'C / C++',
        category: 'Programming',
        trending: false,
        difficulty: 'Intermediate',
        duration: '10 Weeks',
        rating: '4.6 (1,050+ reviews)',
        enrolled: '1,400+ enrolled',
        tagline: 'Understand memory management, compile low-level system drivers, and write performant memory-safe architectures.',
        overview: 'Gain complete mastery over memory layout, pointers, data structures, and compiler logic. This course bridges the gap between hardware and software, teaching you memory-safe programming in C and C++ and showing you how buffer overflows, heap corruptions, and memory leaks occur at the assembly level so you can build secure applications.',
        prerequisites: 'None. Suitable for beginners with dedication to learn system concepts.',
        outcomes: [
            'Manipulate memory using raw pointers, address spaces, and struct grids.',
            'Audit C/C++ source code for standard memory overflow vulnerabilities.',
            'Construct and write customized, thread-safe memory allocations.',
            'Write clean, modular code utilizing advanced OOP principles in C++.'
        ],
        tools: ['GCC / Clang', 'GDB debugger', 'Valgrind', 'CMake', 'Visual Studio', 'Makefiles'],
        syllabus: [
            {
                title: 'Module 1: Memory Layout, Pointers & Struct Allocations',
                topics: ['Understanding Stack vs Heap regions', 'Pointer arithmetic and function pointers', 'Dynamic memory allocation with malloc and free']
            },
            {
                title: 'Module 2: Debugging & Memory Auditing',
                topics: ['Setting breakpoints and tracking registers with GDB', 'Finding memory leaks using Valgrind', 'Analyzing buffer overflows and memory protections']
            },
            {
                title: 'Module 3: Object-Oriented C++ Programming',
                topics: ['Classes, inheritance, and dynamic polymorphism', 'Smart pointers and modern C++ memory guards', 'Standard Template Library (STL) usage']
            },
            {
                title: 'Module 4: Secure compilation & Build Systems',
                topics: ['Compiling with ASAN (Address Sanitizer) flags', 'Writing cross-platform CMake configurations', 'Optimizing and securing low-level binaries']
            }
        ],
        careerRoles: [
            { role: 'Systems Engineer / Programmer', salary: '$100,000 / year' },
            { role: 'Embedded Systems Developer', salary: '$95,000 / year' },
            { role: 'Security Research Specialist', salary: '$118,000 / year' }
        ]
    },
    'web-development': {
        slug: 'web-development',
        title: 'Web Development',
        category: 'Programming',
        trending: false,
        difficulty: 'Beginner',
        duration: '12 Weeks',
        rating: '4.8 (2,430+ reviews)',
        enrolled: '3,100+ enrolled',
        tagline: 'Master modern HTML5, CSS3 Grid layouts, and responsive JavaScript interfaces from scratch.',
        overview: 'Launch your software career. This comprehensive bootcamp takes you from writing your first line of HTML5 to styling complex layouts using CSS Grid and Flexbox, and finally programming rich interactive interfaces with modern JavaScript (ES6+). You will build real-world responsive website assets and deploy them online.',
        prerequisites: 'None. Absolute beginner friendly.',
        outcomes: [
            'Write semantic, SEO-friendly HTML5 markup documents.',
            'Design responsive layouts using Flexbox, CSS Grid, and custom animations.',
            'Program interactive DOM events and state triggers using modern JS.',
            'Fetch real-time data from external public API endpoints using Fetch.'
        ],
        tools: ['VS Code', 'Git & GitHub', 'NPM', 'HTML5 / CSS3', 'JavaScript ES6', 'Figma'],
        syllabus: [
            {
                title: 'Module 1: HTML5 Structure & Semantic Layouts',
                topics: ['Understanding HTML document flow', 'Implementing search engine metadata elements', 'Semantic layout blocks (article, header, main)']
            },
            {
                title: 'Module 2: CSS3 Design Systems & Responsive Layouts',
                topics: ['Flexbox and grid-based alignment paradigms', 'Media queries and mobile-first design philosophy', 'CSS transitions and micro-animations']
            },
            {
                title: 'Module 3: JavaScript Programming Core',
                topics: ['Data types, scopes, and array operations', 'Handling user inputs and event listener triggers', 'Asynchronous flows with Promises and async/await']
            },
            {
                title: 'Module 4: Git, Building & Public Deployment',
                topics: ['Version control workflows on GitHub', 'Deploying static assets to Netlify and Vercel', 'Basic UI design processes using Figma layouts']
            }
        ],
        careerRoles: [
            { role: 'Junior Frontend Developer', salary: '$70,000 / year' },
            { role: 'Web Designer & Developer', salary: '$65,000 / year' },
            { role: 'Freelance Web Consultant', salary: '$60,000 / year' }
        ]
    },
    'mern-stack': {
        slug: 'mern-stack',
        title: 'MERN Stack',
        category: 'Programming',
        trending: false,
        difficulty: 'Intermediate',
        duration: '14 Weeks',
        rating: '4.9 (1,780+ reviews)',
        enrolled: '2,100+ enrolled',
        tagline: 'Build scalable full-stack applications using MongoDB, Express, React, and Node.js with secure auth routing.',
        overview: 'Become a highly employable Full-Stack Developer. Master MongoDB database architecture, build robust Express APIs on Node.js, create dynamic React user interfaces, and deploy secure JSON Web Token authentication. You will engineer complex databases, integrate payment systems, and deploy live full-stack projects.',
        prerequisites: 'Basic JavaScript syntax, variables, objects, and functions.',
        outcomes: [
            'Develop production-ready React frontend structures with secure routing.',
            'Design and audit relational/non-relational database schemas in MongoDB.',
            'Construct and write authenticated RESTful APIs using Express.js.',
            'Deploy secure login workflows utilizing JWT tokens and HTTP-only cookies.'
        ],
        tools: ['MongoDB Atlas', 'Express.js', 'React.js', 'Node.js', 'Mongoose', 'JWT / BCrypt'],
        syllabus: [
            {
                title: 'Module 1: Backend API Development with Node & Express',
                topics: ['Understanding Node server runtime models', 'Routing HTTP requests and designing REST schemas', 'Writing custom middleware functions']
            },
            {
                title: 'Module 2: NoSQL Database Modeling with Mongoose',
                topics: ['Designing schema validations and reference relationships', 'Aggregating documents and writing complex queries', 'Indexing databases for read optimizations']
            },
            {
                title: 'Module 3: Front-End Architecture with React',
                topics: ['Functional component structures and React hooks', 'State management and context definitions', 'Integrating routes with React Router']
            },
            {
                title: 'Module 4: JWT Authentication and Live Hosting',
                topics: ['Password hashing with bcrypt algorithms', 'Managing sessions securely with JWT inside cookies', 'Deploying APIs and frontends to secure server platforms']
            }
        ],
        careerRoles: [
            { role: 'Full-Stack Developer (MERN)', salary: '$110,000 / year' },
            { role: 'Node.js API Specialist', salary: '$105,000 / year' },
            { role: 'React Engineer', salary: '$102,000 / year' }
        ]
    },
    'kotlin': {
        slug: 'kotlin',
        title: 'Kotlin',
        category: 'Programming',
        trending: false,
        difficulty: 'Intermediate',
        duration: '8 Weeks',
        rating: '4.7 (950+ reviews)',
        enrolled: '1,100+ enrolled',
        tagline: 'Write modern Android applications, implement coroutine concurrency, and build scalable multiplatform systems.',
        overview: 'Kotlin is the modern standard for Android and multiplatform software. Learn object-oriented and functional features, handle heavy background tasks using lightweight coroutines, build responsive Android user interfaces with Jetpack Compose, and deploy robust, memory-safe backend interfaces.',
        prerequisites: 'General basic logic and programming fundamentals.',
        outcomes: [
            'Program Android apps using modern Kotlin paradigms.',
            'Implement multi-threaded processes using Kotlin Coroutines.',
            'Build responsive, reactive user interfaces with Jetpack Compose.',
            'Implement clean architectural models (MVVM) in mobile code.'
        ],
        tools: ['Android Studio', 'Jetpack Compose', 'Kotlin Coroutines', 'Ktor API', 'Gradle', 'JUnit'],
        syllabus: [
            {
                title: 'Module 1: Kotlin Syntax, OOP & Functional Core',
                topics: ['Nullable types and compiler-level Null safety', 'Data classes, sealed configurations, and collections', 'Lambdas and high-order functional structures']
            },
            {
                title: 'Module 2: Jetpack Compose & Android UI',
                topics: ['Declarative layouts and Compose lifecycle', 'State tracking and UI event triggers', 'Implementing theme systems and layouts']
            },
            {
                title: 'Module 3: Concurrency with Coroutines & Flows',
                topics: ['Executing background tasks with Dispatchers', 'Managing async streams using Flows', 'Handling exceptions in complex async tasks']
            },
            {
                title: 'Module 4: Network API integration & Testing',
                topics: ['Making API calls with Ktor and Retrofit', 'Writing unit tests with JUnit and Mockito', 'Exporting build configurations using Gradle']
            }
        ],
        careerRoles: [
            { role: 'Android App Developer', salary: '$104,000 / year' },
            { role: 'Kotlin Multiplatform Developer', salary: '$110,000 / year' },
            { role: 'Mobile Engineer', salary: '$102,000 / year' }
        ]
    },
    'machine-learning': {
        slug: 'machine-learning',
        title: 'Machine Learning',
        category: 'AI & Data',
        trending: false,
        difficulty: 'Intermediate',
        duration: '12 Weeks',
        rating: '4.9 (1,670+ reviews)',
        enrolled: '1,900+ enrolled',
        tagline: 'Train predictive algorithms, engineer high-impact data features, and deploy real-time inference models.',
        overview: 'Enter the world of artificial intelligence. This core course covers linear regression, classification algorithms, clustering models, decision trees, and ensemble methods. You will clean and prepare datasets, build custom features, optimize hyper-parameters, and deploy machine learning models through APIs.',
        prerequisites: 'Basic Python syntax and algebra/statistics foundations.',
        outcomes: [
            'Clean, scale, and transform raw structured datasets.',
            'Implement linear, logistic, tree, and cluster models from scratch.',
            'Optimize and validate performance using cross-validation methods.',
            'Build and host ML inference pipelines through FastAPI nodes.'
        ],
        tools: ['Jupyter Notebooks', 'Scikit-Learn', 'NumPy', 'Pandas', 'FastAPI', 'Matplotlib'],
        syllabus: [
            {
                title: 'Module 1: Data Preparation & Exploration',
                topics: ['Handling missing data values and outliers', 'Feature scaling and categorical encoding', 'Statistical analysis with Pandas and Seaborn']
            },
            {
                title: 'Module 2: Supervised Learning Core',
                topics: ['Linear & Ridge regression concepts', 'Classification using Support Vector Machines (SVM)', 'Decision trees and Random Forest ensembles']
            },
            {
                title: 'Module 3: Unsupervised Methods & Optimization',
                topics: ['Clustering datasets using K-Means', 'Dimensionality reduction with PCA algorithms', 'GridSearch hyperparameter tuning strategies']
            },
            {
                title: 'Module 4: API Deployment & Model Tracking',
                topics: ['Exporting models with Joblib serialization', 'Building FastAPI endpoints for real-time inference', 'Monitoring and logging model drifts']
            }
        ],
        careerRoles: [
            { role: 'Machine Learning Engineer', salary: '$128,000 / year' },
            { role: 'Data Analytics Engineer', salary: '$105,000 / year' },
            { role: 'AI Model Developer', salary: '$122,000 / year' }
        ]
    },
    'data-science': {
        slug: 'data-science',
        title: 'Data Science',
        category: 'AI & Data',
        trending: true,
        difficulty: 'Intermediate',
        duration: '14 Weeks',
        rating: '4.9 (2,150+ reviews)',
        enrolled: '2,600+ enrolled',
        tagline: 'Mine complex datasets, tell compelling stories with interactive charts, and build statistical pipelines.',
        overview: 'Data is the lifeblood of modern enterprise decisions. Master data manipulation, perform complex statistical hypothesis tests, build beautiful interactive visual dashboards, and construct predictive pipelines. You will solve real business cases using advanced analytics.',
        prerequisites: 'Basic Python syntax and high-school math skills.',
        outcomes: [
            'Manipulate, slice, and group huge datasets at scale.',
            'Build professional-grade interactive visual charts.',
            'Perform rigorous statistical hypothesis tests.',
            'Present data-driven corporate strategy recommendations.'
        ],
        tools: ['Pandas', 'Seaborn', 'Matplotlib', 'SQL', 'Statsmodels', 'Tableau'],
        syllabus: [
            {
                title: 'Module 1: SQL Database Auditing & Querying',
                topics: ['Writing complex multi-table JOIN operations', 'Aggregating metrics and writing window functions', 'Interfacing SQL databases inside Python']
            },
            {
                title: 'Module 2: Statistical Modeling & Testing',
                topics: ['Designing A/B testing frameworks', 'Calculating Z-scores, T-tests, and P-values', 'Implementing ANOVA test modules']
            },
            {
                title: 'Module 3: Data Storytelling & Dashboard Design',
                topics: ['Building advanced visual charts with Seaborn', 'Designing dashboard wireframes in Tableau', 'Interactive charting using Plotly libraries']
            },
            {
                title: 'Module 4: Analytical Case Studies',
                topics: ['Churn prediction algorithms', 'Customer lifetime value modeling', 'Writing professional research reports']
            }
        ],
        careerRoles: [
            { role: 'Data Scientist', salary: '$120,000 / year' },
            { role: 'Business Intelligence Analyst', salary: '$95,000 / year' },
            { role: 'Quantitative Analyst', salary: '$135,000 / year' }
        ]
    },
    'deep-learning': {
        slug: 'deep-learning',
        title: 'Deep Learning',
        category: 'AI & Data',
        trending: false,
        difficulty: 'Advanced',
        duration: '12 Weeks',
        rating: '4.9 (1,150+ reviews)',
        enrolled: '1,300+ enrolled',
        tagline: 'Build deep neural networks, compile computer vision programs, and deploy natural language models.',
        overview: 'Train machines to perceive the world. This advanced curriculum covers neural network architectures (ANN), Convolutional Neural Networks (CNN) for image analysis, Recurrent Neural Networks (RNN) and LSTMs for time series, and foundational Transformer architectures. You will construct and optimize custom networks.',
        prerequisites: 'Strong linear algebra, calculus, and machine learning foundations.',
        outcomes: [
            'Design and train Multi-Layer Perceptrons in PyTorch/TensorFlow.',
            'Construct Convolutional networks for object detection.',
            'Build LSTM and GRU sequential models for time-series forecasting.',
            'Fine-tune pre-trained Transformer language models.'
        ],
        tools: ['PyTorch', 'TensorFlow', 'CUDA / GPUs', 'HuggingFace', 'OpenCV', 'TensorBoard'],
        syllabus: [
            {
                title: 'Module 1: Deep Learning Fundamentals',
                topics: ['Backpropagation & activation mathematical flows', 'Handling vanishing and exploding gradients', 'Regularization with Dropout and Batch Norm']
            },
            {
                title: 'Module 2: Computer Vision using CNNs',
                topics: ['Image classification with custom architectures', 'Transfer learning using ResNet and VGG networks', 'Object detection workflows with YOLO models']
            },
            {
                title: 'Module 3: Natural Language & Time Series',
                topics: ['Tokenization and Word Embeddings (Word2Vec)', 'Sequential modeling with LSTM layers', 'Understanding Attention mechanisms']
            },
            {
                title: 'Module 4: Transformer Architecture & HuggingFace',
                topics: ['Self-Attention calculation methods', 'Fine-tuning BERT and GPT structures', 'Monitoring network trainings with TensorBoard']
            }
        ],
        careerRoles: [
            { role: 'Deep Learning Specialist', salary: '$140,000 / year' },
            { role: 'Computer Vision Engineer', salary: '$132,000 / year' },
            { role: 'NLP Research Engineer', salary: '$138,000 / year' }
        ]
    },
    'ai-course': {
        slug: 'ai-course',
        title: 'AI Course',
        category: 'AI & Data',
        trending: false,
        difficulty: 'Beginner',
        duration: '10 Weeks',
        rating: '4.8 (1,480+ reviews)',
        enrolled: '1,800+ enrolled',
        tagline: 'Understand artificial intelligence landscapes, write generative prompts, and build low-code AI agents.',
        overview: 'A complete, accessible introduction to the generative AI revolution. Learn how Large Language Models (LLMs) operate, master advanced prompt engineering methodologies, build automated AI agent flows using LangChain, and understand critical ethical AI guidelines. You will create and deploy intelligent automated chatbot systems.',
        prerequisites: 'None. Open to anyone interested in leveraging artificial intelligence.',
        outcomes: [
            'Master advanced prompt engineering structures (Few-shot, CoT).',
            'Build automated, agentic chat pipelines using LangChain.',
            'Implement Retrieval-Augmented Generation (RAG) databases.',
            'Understand AI security vulnerabilities like prompt injection.'
        ],
        tools: ['OpenAI APIs', 'LangChain', 'Pinecone', 'HuggingFace', 'Flowise', 'Prompt Engineering'],
        syllabus: [
            {
                title: 'Module 1: Generative AI Landscapes & LLMs',
                topics: ['Understanding token allocations & temperature settings', 'Comparing GPT, Claude, and Llama capabilities', 'API usage calculations & pricing structures']
            },
            {
                title: 'Module 2: Advanced Prompt Engineering',
                topics: ['Few-Shot prompting and custom system directions', 'Chain of Thought (CoT) and ReAct frameworks', 'Bypassing common LLM logic limitations']
            },
            {
                title: 'Module 3: Building RAG & Agent workflows',
                topics: ['Creating text embeddings and vector indexing', 'Storing document fragments inside Pinecone DB', 'Orchestrating tools using LangChain frameworks']
            },
            {
                title: 'Module 4: Security, Ethics & Low-Code Agents',
                topics: ['Detecting prompt injection vulnerability patterns', 'Ethical AI bounds & output verification tools', 'Building chat pipelines using Flowise low-code grids']
            }
        ],
        careerRoles: [
            { role: 'AI Integration Consultant', salary: '$115,000 / year' },
            { role: 'Prompt Engineer / Specialist', salary: '$98,000 / year' },
            { role: 'AI Solutions Architect', salary: '$125,000 / year' }
        ]
    }
};
