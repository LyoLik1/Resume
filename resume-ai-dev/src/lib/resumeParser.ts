import fs from 'fs';
import path from 'path';

const stripMarkdown = (text: string) => {
    return text.replace(/\*\*/g, '');
};

interface Contact {
  type: string;
  value: string;
  href: string;
}

interface Experience {
  jobTitle: string;
  companyName: string;
  dates: string;
  responsibilities: string[];
}

interface Education {
  institution: string;
  degree: string;
  period: string;
  faculty?: string;
  specialty?: string;
  courses?: string[];
  certificateLink?: string;
}

interface Language {
    name: string;
    level: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    position: string;
    location: string;
  };
  contacts: Contact[];
  about: string;
  techStack: { [key: string]: string[] };
  workHistory: Experience[];
  portfolio: {
    name: string;
    url: string;
    screenshot?: string;
  }[];
  education: Education[];
  languages: Language[];
  personalStatement: string;
}

export const parseResume = (): ResumeData => {
  const filePath = path.join(process.cwd(), 'data', 'resume_content.md');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n');

  const resumeData: ResumeData = {
    personalInfo: { name: '', position: '', location: '' },
    contacts: [],
    about: '',
    techStack: {},
    workHistory: [],
    portfolio: [],
    education: [],
    languages: [],
    personalStatement: '',
  };

  let currentSection = '';
  let currentWorkExperience: Partial<Experience> = {};
  let currentEducation: Partial<Education> = {};

  for (const line of lines) {
    if (line.startsWith('## ')) {
      currentSection = line.substring(3).trim();
      continue;
    }

    if (line.startsWith('### ')) {
        if (currentSection === 'Work History') {
            if (currentWorkExperience.jobTitle) {
                resumeData.workHistory.push(currentWorkExperience as Experience);
            }
            currentWorkExperience = { jobTitle: line.substring(4).trim(), responsibilities: [] };
        }
        continue;
    }


    switch (currentSection) {
      case 'Personal Information and Contacts':
        if (line.includes('Full Name:')) {
          resumeData.personalInfo.name = stripMarkdown(line.split(':')[1].trim());
        } else if (line.includes('Position:')) {
          resumeData.personalInfo.position = stripMarkdown(line.split(':')[1].trim());
        } else if (line.includes('Location:')) {
          resumeData.personalInfo.location = stripMarkdown(line.split(':')[1].trim());
        } else if (line.includes('Email:')) {
          const value = stripMarkdown(line.split(':')[1].trim());
          resumeData.contacts.push({ type: 'Email', value, href: `mailto:${value}` });
        } else if (line.includes('Phone:')) {
            const value = stripMarkdown(line.split(':')[1].trim());
            resumeData.contacts.push({ type: 'Phone', value, href: `tel:${value.replace(/\s/g, '')}` });
        } else if (line.includes('LinkedIn:')) {
            const value = stripMarkdown(line.split(':')[1].trim());
            resumeData.contacts.push({ type: 'LinkedIn', value, href: value });
        } else if (line.includes('GitHub:')) {
            const value = line.match(/\((.*?)\)/)?.[1] || '';
            resumeData.contacts.push({ type: 'GitHub', value, href: value });
        } else if (line.includes('Telegram:')) {
            const value = stripMarkdown(line.split(':')[1].trim());
            resumeData.contacts.push({ type: 'Telegram', value, href: `https://${value}` });
        }
        break;
      case 'About Me (Intro)':
        if (line.trim()) resumeData.about += stripMarkdown(line.trim()) + ' ';
        break;
      case 'Tech Stack':
        if (line.startsWith('- ')) {
            const [category, techs] = line.substring(2).split(':');
            const techList = techs.split(',').map(t => stripMarkdown(t.trim()));
            resumeData.techStack[stripMarkdown(category.trim())] = techList;
        }
        break;
      case 'Work History':
        if (line.startsWith('###')) {
            if (currentWorkExperience.jobTitle) {
                resumeData.workHistory.push(currentWorkExperience as Experience);
            }
            currentWorkExperience = { jobTitle: stripMarkdown(line.substring(4).split('—')[0].trim()), responsibilities: [] };
            currentWorkExperience.companyName = stripMarkdown(line.substring(4).split('—')[1].trim());
        } else if (line.match(/\*.*\|.*/)) {
            const parts = line.split('|');
            currentWorkExperience.dates = stripMarkdown(parts[1].trim());
        } else if (line.startsWith('- ')) {
            currentWorkExperience.responsibilities?.push(stripMarkdown(line.substring(2).trim()));
        }
        break;
      case 'Portfolio':
        if (line.startsWith('- ')) {
            const lineContent = line.substring(2).trim();
            const nameMatch = lineContent.match(/\*\*(.*?)\*\*:/);
            const urlMatch = lineContent.match(/:\s*(https?:\/\/[^\s\)]*|#)/);
            const screenshotMatch = lineContent.match(/\(screenshot:\s*(.*?)\)/);

            if (nameMatch && urlMatch) {
                resumeData.portfolio.push({
                    name: nameMatch[1],
                    url: urlMatch[1],
                    screenshot: screenshotMatch ? screenshotMatch[1] : undefined,
                });
            }
        }
        break;
      case 'Education':
        if (line.startsWith('**')) {
            if (currentEducation.institution) {
                resumeData.education.push(currentEducation as Education);
            }
            currentEducation = { institution: stripMarkdown(line), degree: '', period: '', courses: [] };
        } else if (line.includes('|') && currentEducation.institution) {
            const [degree, period] = line.split('|');
            const linkMatch = degree.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
                currentEducation.degree = stripMarkdown(linkMatch[1]);
                currentEducation.certificateLink = linkMatch[2];
            } else {
                currentEducation.degree = stripMarkdown(degree.trim());
            }
            currentEducation.period = stripMarkdown(period.trim());
        }
        break;
      case 'Languages':
        if (line.startsWith('- ')) {
            const [name, level] = line.substring(2).split('—');
            resumeData.languages.push({ name: stripMarkdown(name.trim()), level: stripMarkdown(level.trim()) });
        }
        break;
      case 'Personal Statement':
        if (line.trim()) resumeData.personalStatement += stripMarkdown(line.trim()) + ' ';
        break;
    }
  }
    if (currentWorkExperience.jobTitle) {
        resumeData.workHistory.push(currentWorkExperience as Experience);
    }
    if (currentEducation.institution) {
        resumeData.education.push(currentEducation as Education);
    }

  // Trim trailing spaces
  resumeData.about = resumeData.about.trim();
  resumeData.personalStatement = resumeData.personalStatement.trim();

  return resumeData;
};