import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import ReactMarkdown from "react-markdown";
import "./App.css";

/* =========================================================
   SNOWHUB BY SIVA — ITSM COURSE
========================================================= */

const courses = [
  { icon: "⚙", color: "cyan", title: "ITSM", description: "Learn Incident, Problem, Change, Knowledge and Service Catalog step by step.", topics: 12 },
  { icon: "</>", color: "purple", title: "ServiceNow Scripting", description: "Master GlideRecord, Client Scripts, Business Rules, Script Includes and GlideAjax.", topics: 20 },
  { icon: "⌘", color: "blue", title: "Integrations", description: "Learn REST, SOAP, IntegrationHub, Microsoft Graph and Azure integrations.", topics: 15 },
  { icon: "◈", color: "pink", title: "CMDB & Discovery", description: "Understand CMDB, IRE, Discovery, CMDB Health and CSDM concepts.", topics: 14 },
];

const itsmTopics = [
  ["01", "Introduction to ITSM", "Understand ITSM fundamentals and how ServiceNow supports IT service management."],
  ["02", "Incident Management", "Learn how incidents are created, categorized, prioritized, assigned and resolved."],
  ["03", "Problem Management", "Understand problems, root cause analysis, known errors and problem lifecycle."],
  ["04", "Change Management", "Learn how changes are planned, assessed, approved, implemented and reviewed."],
  ["05", "Knowledge Management", "Learn how knowledge articles are created, reviewed, published and maintained."],
  ["06", "Service Catalog", "Understand catalog items, variables, requests, RITMs, catalog tasks and order guides."],
  ["07", "Users, Groups & Roles", "Learn the fundamentals of ServiceNow users, groups, roles and access organization."],
  ["08", "SLA & SLM", "Understand service-level agreements, targets, breaches and service level management."],
  ["09", "Business Rules", "Learn server-side Business Rules, execution timing and GlideRecord automation."],
  ["10", "Client Scripts", "Understand onLoad, onChange, onSubmit and onCellEdit client-side scripting."],
  ["11", "Access Control", "Learn ACL fundamentals and how ServiceNow controls access to records and fields."],
  ["12", "Reporting & Dashboards", "Learn how to create reports, visualize data and organize dashboards."],
];

const lessonData = {
  "01": {
    title: "Introduction to",
    gradient: "ITSM.",
    label: "ITSM • INTRODUCTION",
    description: "Build a strong foundation in IT Service Management and understand how ServiceNow supports IT operations.",
       challenge: {
  title: "Think Like a Service Desk",
  scenario:
    "An employee reports that company email is not working. The Service Desk needs to record the interruption and track the work until the service is restored.",
  question: "Which process should normally be used?",
  options: [
    "Incident Management",
    "Problem Management",
    "Change Management",
    "Service Catalog",
  ],
  answer: "Incident Management",
  explanation:
    "Incident Management focuses on restoring normal service after an interruption.",
},
interview: [
  {
    question: "What does ITSM stand for?",
    answer:
      "ITSM stands for IT Service Management. It is a structured approach used to design, deliver, support and improve IT services.",
  },
  {
    question: "What is the role of ServiceNow in ITSM?",
    answer:
      "ServiceNow provides a platform to manage ITSM processes such as Incident, Problem, Change, Knowledge and Service Catalog.",
  },
  {
    question: "What is the difference between Incident and Problem Management?",
    answer:
      "Incident Management focuses on restoring normal service quickly, while Problem Management focuses on identifying and managing the underlying cause of incidents.",
  },
],
  sections: [

  {
    label: "01 • FUNDAMENTALS",
    title: "What is ITSM?",
    paragraphs: [
      "ITSM stands for IT Service Management. It is a structured approach for designing, delivering, supporting and improving IT services.",
      "The goal of ITSM is to provide reliable IT services to users while managing incidents, problems, changes and service requests in a structured way.",
      "ServiceNow provides a platform where common ITSM processes such as Incident, Problem, Change, Knowledge and Service Catalog can be managed in one place."
    ],
    cards: [
      [
        "⚙",
        "Incident",
        "Restore normal service quickly when something goes wrong."
      ],
      [
        "🔎",
        "Problem",
        "Find and manage the underlying causes of recurring incidents."
      ],
      [
        "🔄",
        "Change",
        "Plan and control changes to the IT environment."
      ]
    ]
  },

  {
    label: "02 • WHY ITSM?",
    title: "Why is ITSM Important?",
    paragraphs: [
      "IT environments involve many users, applications, devices and services. Without a structured process, support teams can find it difficult to track and manage issues consistently.",
      "ITSM provides defined processes that help teams record work, assign responsibility, track progress and improve the way IT services are delivered."
    ],
    cards: [
      [
        "🎯",
        "Structured Process",
        "Teams follow defined processes instead of handling every request differently."
      ],
      [
        "👥",
        "Better Support",
        "Support teams can organize, assign and track user issues."
      ],
      [
        "📊",
        "Visibility",
        "Organizations can monitor IT work using reports and dashboards."
      ]
    ]
  },

  {
    label: "03 • CORE PROCESSES",
    title: "The ITSM Landscape",
    flow: [
      "Incident",
      "Problem",
      "Change",
      "Knowledge",
      "Catalog"
    ],
    paragraphs: [
      "These processes work together as part of an organization's IT service management environment.",
      "For example, an incident can lead to a problem investigation, while a change may be required to implement the permanent solution."
    ]
  },

  {
    label: "04 • SERVICENOW",
    title: "How ServiceNow Supports ITSM",
    paragraphs: [
      "ServiceNow provides applications and workflows that help organizations manage ITSM processes from a centralized platform.",
      "A Service Desk agent can create and manage records, assign work to appropriate teams, track progress and communicate updates from within ServiceNow."
    ],
    cards: [
      [
        "🎫",
        "Incident",
        "Track and resolve service interruptions."
      ],
      [
        "🔍",
        "Problem",
        "Investigate underlying causes."
      ],
      [
        "📚",
        "Knowledge",
        "Provide reusable support information."
      ],
      [
        "🛒",
        "Service Catalog",
        "Allow users to request services and items."
      ]
    ]
  },

  {
    label: "05 • REAL-WORLD EXAMPLE",
    title: "Employee Cannot Access Email",
    scenario:
      "An employee reports that email is not working. A Service Desk agent creates an incident, categorizes it, sets priority, assigns it to the appropriate team and works toward restoration. If the same issue repeatedly occurs, a problem record can be created to investigate the underlying cause."
  },

  {
    label: "06 • INCIDENT vs PROBLEM",
    title: "Understand the Difference",
    cards: [
      [
        "🚨",
        "Incident",
        "Focus: Restore the service as quickly as possible."
      ],
      [
        "🔎",
        "Problem",
        "Focus: Identify and manage the underlying cause."
      ]
    ],
    paragraphs: [
      "An incident is about the current interruption or degradation of a service.",
      "A problem is about understanding and managing the underlying cause of one or more incidents."
    ]
  },

  {
    label: "07 • PRACTICE",
    title: "Think Like a Service Desk",
    scenario:
      "A user says, ‘My laptop cannot connect to the company Wi-Fi.’ Ask yourself: Is this an incident, a problem, a change or a knowledge article?"
  },

  {
    label: "08 • QUICK QUIZ",
    title: "Which process focuses on restoring service after an interruption?",
    quiz: [
      "Incident",
      "Problem",
      "Change",
      "Catalog"
    ],
    answer: "Incident"
  }

],
 
  },
  "02": {
  title: "Incident",
  gradient: "Management.",
  label: "ITSM • INCIDENT MANAGEMENT",
  description:
    "Learn how ServiceNow records, prioritizes, assigns and resolves incidents while restoring normal service as quickly as possible.",

  challenge: {
    title: "Think Like a Service Desk",
    scenario:
      "Several employees report that they cannot access the company VPN. The Service Desk needs to record the issue, determine its priority and assign it to the correct support team.",

    question: "Which process should be used to manage this situation?",

    options: [
      "Incident Management",
      "Problem Management",
      "Change Management",
      "Knowledge Management",
    ],

    answer: "Incident Management",

    explanation:
      "Incident Management focuses on restoring normal service after an interruption or degradation."
  },

  interview: [
    {
      question: "What is an Incident in ServiceNow?",
      answer:
        "An incident is a record used to track an interruption or degradation of an IT service and the work required to restore normal service."
    },

    {
      question: "What is the primary goal of Incident Management?",
      answer:
        "The primary goal is to restore normal service as quickly as possible while minimizing the impact on users and the business."
    },

    {
      question: "What is the difference between an Incident and a Problem?",
      answer:
        "Incident Management focuses on restoring service, while Problem Management focuses on identifying and managing the underlying cause of one or more incidents."
    },

    {
      question: "What are Impact and Urgency?",
      answer:
        "Impact represents the extent to which the incident affects users or the business. Urgency represents how quickly the incident needs to be resolved."
    },

    {
      question: "How is Priority determined?",
      answer:
        "Priority is generally determined using factors such as Impact and Urgency. Higher impact and higher urgency normally result in a higher priority."
    }
  ],

  sections: [

    {
      label: "01 • FUNDAMENTALS",
      title: "What is an Incident?",

      paragraphs: [
        "An incident is an unplanned interruption to an IT service or a reduction in the quality of an IT service.",
        "In ServiceNow, an incident record is used to capture the issue, track the work performed by support teams and follow the incident until the service is restored."
      ],

      cards: [
        [
          "🚨",
          "Interruption",
          "A service is unavailable or not working as expected."
        ],
        [
          "⚠️",
          "Degradation",
          "A service is available but its performance or quality has decreased."
        ],
        [
          "🎯",
          "Restoration",
          "The main objective is to restore normal service."
        ]
      ]
    },

    {
      label: "02 • INCIDENT vs REQUEST",
      title: "Incident or Service Request?",

      paragraphs: [
        "An incident normally represents something that is broken, unavailable or not working as expected.",
        "A service request is generally a request for something that a user needs, such as access, information or a standard service."
      ],

      cards: [
        [
          "🚨",
          "Incident",
          "My company VPN is not working."
        ],
        [
          "🛒",
          "Service Request",
          "I need access to the company VPN."
        ]
      ]
    },

    {
      label: "03 • INCIDENT LIFECYCLE",
      title: "Incident Lifecycle",

      flow: [
        "New",
        "Assigned",
        "In Progress",
        "Resolved",
        "Closed"
      ],

      paragraphs: [
        "An incident moves through different stages as the Service Desk and support teams work on the issue.",
        "The exact workflow can vary depending on the organization's configuration and processes."
      ]
    },

    {
      label: "04 • PRIORITY",
      title: "Impact, Urgency and Priority",

      paragraphs: [
        "Impact describes how widely the incident affects users, services or the business.",
        "Urgency describes how quickly the incident needs attention.",
        "Priority is used to help determine the order in which incidents should be handled."
      ],

      cards: [
        [
          "🌐",
          "Impact",
          "How much of the business or how many users are affected?"
        ],
        [
          "⏱️",
          "Urgency",
          "How quickly does the issue need attention?"
        ],
        [
          "🔥",
          "Priority",
          "Helps determine how quickly the incident should be handled."
        ]
      ]
    },

    {
      label: "05 • INCIDENT RECORD",
      title: "Important Incident Fields",

      paragraphs: [
        "When creating or managing an incident, support agents capture information that helps teams understand and resolve the issue."
      ],

      cards: [
        [
          "👤",
          "Caller",
          "The user who reported or is affected by the incident."
        ],
        [
          "📝",
          "Short Description",
          "A concise summary of the issue."
        ],
        [
          "📂",
          "Category",
          "Classifies the type of issue."
        ],
        [
          "👥",
          "Assignment Group",
          "The support team responsible for working on the incident."
        ]
      ]
    },

    {
      label: "06 • REAL-WORLD EXAMPLE",
      title: "Company VPN is Not Working",

      scenario:
        "An employee reports that the company VPN is not connecting. The Service Desk creates an incident, records the caller and issue, determines the appropriate category and priority, and assigns the incident to the relevant support team. The team investigates the issue and works toward restoring VPN access."
    },

    {
      label: "07 • SERVICE DESK",
      title: "How an Agent Handles an Incident",

      flow: [
        "Identify",
        "Record",
        "Prioritize",
        "Assign",
        "Resolve"
      ],

      paragraphs: [
        "The Service Desk first understands the user's issue and records the incident.",
        "The agent then determines the appropriate priority, assigns the incident to the responsible team and tracks the work until the service is restored."
      ]
    },

    {
      label: "08 • PRACTICE",
      title: "Think Like a Service Desk",

      scenario:
        "A user says, ‘My laptop cannot connect to the company Wi-Fi.’ Ask yourself: Is this an incident or a service request? What information would you capture before assigning the incident?"
    },

    {
      label: "09 • QUICK QUIZ",
      title: "What is the primary goal of Incident Management?",

      quiz: [
        "Find the permanent root cause",
        "Restore normal service",
        "Create a new catalog item",
        "Build a dashboard"
      ],

      answer: "Restore normal service"
    },

    {
      label: "10 • KEY TAKEAWAY",
      title: "Remember This",

      paragraphs: [
        "Incident Management is primarily about restoring normal service as quickly as possible.",
        "Remember the basic flow: identify the issue, record it, prioritize it, assign it, work on it, resolve it and close it according to the organization's process."
      ]
    }

  ]
},
"03": {
  title: "Problem",
  gradient: "Management.",
  label: "ITSM • PROBLEM MANAGEMENT",
  description:
    "Learn how ServiceNow identifies, investigates and manages the underlying causes of incidents.",

  challenge: {
    title: "Think Like a Problem Manager",

    scenario:
      "A company's VPN has failed several times during the last month. Each incident was resolved, but the same issue keeps happening.",

    question:
      "Which process should be used to investigate the underlying cause?",

    options: [
      "Incident Management",
      "Problem Management",
      "Change Management",
      "Service Catalog"
    ],

    answer: "Problem Management",

    explanation:
      "Problem Management focuses on identifying and managing the underlying cause of one or more incidents."
  },

  interview: [
    {
      question: "What is Problem Management?",

      answer:
        "Problem Management is the process of identifying and managing the underlying causes of one or more incidents."
    },

    {
      question: "What is the primary goal of Problem Management?",

      answer:
        "The goal is to identify the underlying cause of incidents and reduce or prevent the recurrence of incidents."
    },

    {
      question: "What is the difference between Incident and Problem Management?",

      answer:
        "Incident Management focuses on restoring normal service, while Problem Management focuses on identifying and managing the underlying cause."
    },

    {
      question: "What is a Known Error?",

      answer:
        "A Known Error is a problem that has been identified and documented, including information about its cause or a workaround."
    },

    {
      question: "What is Root Cause Analysis?",

      answer:
        "Root Cause Analysis is an approach used to investigate why an incident or problem occurred and identify the underlying cause."
    }
  ],

  sections: [

    {
      label: "01 • FUNDAMENTALS",
      title: "What is Problem Management?",

      paragraphs: [
        "A problem is the underlying cause of one or more incidents.",
        "Problem Management focuses on investigating problems, identifying their causes and managing actions that can reduce or prevent recurring incidents.",
        "While Incident Management focuses on restoring service, Problem Management focuses on understanding why the issue occurred."
      ],

      cards: [
        [
          "🔎",
          "Investigate",
          "Understand why incidents are occurring."
        ],
        [
          "🎯",
          "Find Cause",
          "Identify the underlying cause of the issue."
        ],
        [
          "🛡️",
          "Prevent Recurrence",
          "Reduce the chance of the same issue happening again."
        ]
      ]
    },

    {
      label: "02 • INCIDENT vs PROBLEM",
      title: "Incident or Problem?",

      cards: [
        [
          "🚨",
          "Incident",
          "Focus on restoring normal service quickly."
        ],
        [
          "🔎",
          "Problem",
          "Focus on identifying and managing the underlying cause."
        ]
      ],

      paragraphs: [
        "For example, if a user cannot access email, the Service Desk may create an incident to restore the service.",
        "If the email service repeatedly fails because of an underlying technical issue, a problem can be investigated to understand and address the cause."
      ]
    },

    {
      label: "03 • PROBLEM LIFECYCLE",
      title: "Problem Lifecycle",

      flow: [
        "Identify",
        "Investigate",
        "Analyze",
        "Known Error",
        "Resolve"
      ],

      paragraphs: [
        "A problem can move through different stages while support teams investigate the underlying cause.",
        "The exact states and workflow can vary depending on the organization's ServiceNow configuration."
      ]
    },

    {
      label: "04 • ROOT CAUSE",
      title: "Finding the Underlying Cause",

      paragraphs: [
        "Root Cause Analysis helps teams understand why a problem occurred rather than only treating its visible symptoms.",
        "The investigation may involve reviewing incident history, logs, configuration information, recent changes and other technical evidence."
      ],

      cards: [
        [
          "📋",
          "Incident History",
          "Look for patterns across previous incidents."
        ],
        [
          "🔍",
          "Investigation",
          "Analyze technical and operational information."
        ],
        [
          "💡",
          "Root Cause",
          "Identify the underlying reason for the recurring issue."
        ]
      ]
    },

    {
      label: "05 • KNOWN ERROR",
      title: "What is a Known Error?",

      paragraphs: [
        "A Known Error is a problem that has been identified and documented.",
        "Known Error information can help support teams understand an issue and use an available workaround while a permanent solution is being developed."
      ],

      cards: [
        [
          "📌",
          "Identified",
          "The problem and its cause have been investigated."
        ],
        [
          "📝",
          "Documented",
          "Relevant information is recorded for future reference."
        ],
        [
          "🛠️",
          "Workaround",
          "A temporary way of dealing with the issue may be available."
        ]
      ]
    },

    {
      label: "06 • REAL-WORLD EXAMPLE",
      title: "VPN Fails Every Monday",

      scenario:
        "Employees report that the company VPN stops working every Monday morning. The Service Desk resolves each incident, but the issue keeps returning. A problem record can be created to investigate the recurring behavior, identify the underlying cause and determine a long-term solution."
    },

    {
      label: "07 • PROBLEM INVESTIGATION",
      title: "What Can the Team Investigate?",

      cards: [
        [
          "📊",
          "Patterns",
          "Look for repeated incidents or common symptoms."
        ],
        [
          "🖥️",
          "Technical Data",
          "Review logs, configurations and system information."
        ],
        [
          "🔄",
          "Recent Changes",
          "Check whether recent changes could be related to the issue."
        ],
        [
          "🛠️",
          "Workarounds",
          "Identify temporary solutions that can help users."
        ]
      ]
    },

    {
      label: "08 • PRACTICE",
      title: "Think Like a Problem Manager",

      scenario:
        "A database server crashes every few days. Each crash is handled as an incident, but the crashes continue. Ask yourself: Should the team continue handling only individual incidents, or should it investigate the underlying cause through Problem Management?"
    },

    {
      label: "09 • QUICK QUIZ",
      title: "What is the primary focus of Problem Management?",

      quiz: [
        "Restore service immediately",
        "Find the underlying cause",
        "Create a catalog request",
        "Build a dashboard"
      ],

      answer: "Find the underlying cause"
    },

    {
      label: "10 • KEY TAKEAWAY",
      title: "Remember This",

      paragraphs: [
        "Incident Management restores service. Problem Management investigates the underlying cause.",
        "Remember the simple distinction: Incident = restore the service. Problem = understand why the issue happened and reduce the chance of recurrence."
      ]
    }

  ]
},
  "04": {
  title: "Change",
  gradient: "Management.",
  label: "ITSM • CHANGE MANAGEMENT",
  description:
    "Learn how ServiceNow plans, assesses, approves, schedules and implements changes while managing risk to IT services.",

  challenge: {
    title: "Think Like a Change Manager",

    scenario:
      "A company needs to upgrade the production database. The upgrade could affect business applications, so the team needs to plan the work, assess the risk and obtain the required authorization before implementation.",

    question:
      "Which process should be used to manage this planned modification?",

    options: [
      "Incident Management",
      "Problem Management",
      "Change Management",
      "Knowledge Management"
    ],

    answer: "Change Management",

    explanation:
      "Change Management helps organizations plan, assess, authorize, schedule and implement changes in a controlled way."
  },

  interview: [
    {
      question: "What is Change Management?",

      answer:
        "Change Management is the process of managing changes to IT services and infrastructure in a controlled and structured way."
    },

    {
      question: "What are the common types of changes?",

      answer:
        "Common change types include Standard, Normal and Emergency changes."
    },

    {
      question: "What is a Standard Change?",

      answer:
        "A Standard Change is a commonly performed, low-risk change that follows an established and documented procedure."
    },

    {
      question: "What is a Normal Change?",

      answer:
        "A Normal Change is a planned change that generally requires assessment and authorization before implementation."
    },

    {
      question: "What is an Emergency Change?",

      answer:
        "An Emergency Change is a change that needs to be implemented urgently to address a critical situation."
    }
  ],

  sections: [

    {
      label: "01 • FUNDAMENTALS",
      title: "What is Change Management?",

      paragraphs: [
        "Change Management helps organizations control modifications to IT services, applications, infrastructure and other components of the IT environment.",
        "The objective is to make changes in a controlled way while considering risk, impact, timing and required authorization.",
        "In ServiceNow, a change request can be used to plan, assess, approve, schedule, implement and review a change."
      ],

      cards: [
        [
          "📝",
          "Plan",
          "Define what needs to change and how the change will be performed."
        ],
        [
          "⚠️",
          "Assess",
          "Understand potential impact and risk."
        ],
        [
          "✅",
          "Authorize",
          "Obtain the required approval before implementation."
        ]
      ]
    },

    {
      label: "02 • CHANGE TYPES",
      title: "Types of Changes",

      cards: [
        [
          "⚡",
          "Standard",
          "A commonly performed, low-risk change that follows an established procedure."
        ],
        [
          "📋",
          "Normal",
          "A planned change that generally requires assessment and authorization."
        ],
        [
          "🚨",
          "Emergency",
          "A change that needs urgent implementation to address a critical situation."
        ]
      ]
    },

    {
      label: "03 • CHANGE LIFECYCLE",
      title: "Change Lifecycle",

      flow: [
        "New",
        "Assess",
        "Authorize",
        "Scheduled",
        "Implement",
        "Review"
      ],

      paragraphs: [
        "A change can move through several stages from creation through implementation and review.",
        "The exact states, approvals and workflow can vary depending on the organization's ServiceNow configuration."
      ]
    },

    {
      label: "04 • RISK & IMPACT",
      title: "Assessing a Change",

      paragraphs: [
        "Before implementing a change, the team should understand its potential impact and risk.",
        "The assessment can consider affected services, users, systems, implementation steps, dependencies and possible failure scenarios."
      ],

      cards: [
        [
          "🎯",
          "Impact",
          "Understand which services, systems or users may be affected."
        ],
        [
          "⚠️",
          "Risk",
          "Consider what could go wrong during the change."
        ],
        [
          "🔙",
          "Backout Plan",
          "Define how the environment can be restored if the change fails."
        ]
      ]
    },

    {
      label: "05 • CHANGE REQUEST",
      title: "Important Change Information",

      paragraphs: [
        "A change request should contain enough information for the responsible teams and approvers to understand what will happen and how the change will be implemented."
      ],

      cards: [
        [
          "📝",
          "Description",
          "Explain what is being changed and why."
        ],
        [
          "📅",
          "Schedule",
          "Define when the change is planned."
        ],
        [
          "⚠️",
          "Risk & Impact",
          "Document potential risks and affected services."
        ],
        [
          "🔙",
          "Backout Plan",
          "Describe the recovery approach if implementation fails."
        ]
      ]
    },

    {
      label: "06 • REAL-WORLD EXAMPLE",
      title: "Production Database Upgrade",

      scenario:
        "A company plans to upgrade its production database. The team creates a change request, documents the implementation plan, assesses risk and impact, identifies a maintenance window, obtains the required authorization and then performs the upgrade. After implementation, the team verifies that the services are working correctly."
    },

    {
      label: "07 • CHANGE vs INCIDENT",
      title: "Understand the Difference",

      cards: [
        [
          "🚨",
          "Incident",
          "An interruption or degradation of an IT service that needs restoration."
        ],
        [
          "🔄",
          "Change",
          "A planned or controlled modification to an IT service or environment."
        ]
      ],

      paragraphs: [
        "If an application suddenly stops working, the situation may be handled as an incident.",
        "If the team intentionally modifies the application to add a new version or configuration, the modification can be managed as a change."
      ]
    },

    {
      label: "08 • PRACTICE",
      title: "Think Like a Change Manager",

      scenario:
        "The infrastructure team wants to upgrade a production server next weekend. Ask yourself: What should be documented before implementation? What could be the impact? What is the rollback or backout plan?"
    },

    {
      label: "09 • QUICK QUIZ",
      title: "Which type of change generally requires assessment and authorization?",

      quiz: [
        "Standard",
        "Normal",
        "Incident",
        "Knowledge"
      ],

      answer: "Normal"
    },

    {
      label: "10 • KEY TAKEAWAY",
      title: "Remember This",

      paragraphs: [
        "Change Management helps organizations make controlled modifications to IT services and infrastructure.",
        "Remember the basic idea: Plan the change, assess the risk and impact, obtain the required authorization, schedule and implement the change, then review the result."
      ]
    }

  ]
},
  "05": {
  title: "Knowledge",
  gradient: "Management.",
  label: "ITSM • KNOWLEDGE MANAGEMENT",
  description:
    "Learn how ServiceNow helps organizations create, organize, review, publish and maintain knowledge articles.",

  challenge: {
    title: "Think Like a Service Desk",

    scenario:
      "A support team repeatedly receives the same question about resetting a corporate password. The team wants users and support agents to have a reusable article explaining the steps.",

    question:
      "What should the team create?",

    options: [
      "Knowledge Article",
      "Change Request",
      "Problem Record",
      "Incident Record"
    ],

    answer: "Knowledge Article",

    explanation:
      "A Knowledge Article can provide reusable information and instructions to users and support teams."
  },

  interview: [
    {
      question: "What is Knowledge Management?",

      answer:
        "Knowledge Management is the process of creating, organizing, maintaining and sharing useful information so that users and support teams can find and reuse it."
    },

    {
      question: "What is a Knowledge Article?",

      answer:
        "A Knowledge Article is a documented piece of information that can provide instructions, solutions, procedures or other useful information to users and support teams."
    },

    {
      question: "Why is Knowledge Management important?",

      answer:
        "It helps users and support teams find reusable information, which can improve consistency and reduce the need to solve the same questions repeatedly."
    },

    {
      question: "Who can use Knowledge Articles?",

      answer:
        "Depending on the organization's configuration and access rules, Knowledge Articles can be made available to users, support agents or other intended audiences."
    },

    {
      question: "What is the difference between an Incident and a Knowledge Article?",

      answer:
        "An incident records and tracks a specific service interruption or degradation, while a Knowledge Article provides reusable information, instructions or solutions."
    }
  ],

  sections: [

    {
      label: "01 • FUNDAMENTALS",
      title: "What is Knowledge Management?",

      paragraphs: [
        "Knowledge Management helps organizations capture, organize, maintain and share useful information.",
        "In ServiceNow, knowledge articles can provide solutions, instructions, procedures and other information that users and support teams can reuse.",
        "The goal is to make useful information easier to find and use."
      ],

      cards: [
        [
          "📝",
          "Create",
          "Capture useful information in a structured article."
        ],
        [
          "🔍",
          "Find",
          "Help users and support teams locate relevant information."
        ],
        [
          "🔄",
          "Maintain",
          "Keep knowledge information accurate and useful."
        ]
      ]
    },

    {
      label: "02 • KNOWLEDGE ARTICLE",
      title: "What is a Knowledge Article?",

      paragraphs: [
        "A Knowledge Article contains information that can help users or support teams understand a process, solve an issue or follow a set of instructions.",
        "Articles can cover topics such as troubleshooting steps, frequently asked questions, procedures and service information."
      ],

      cards: [
        [
          "💡",
          "Solution",
          "Explain how to solve a common issue."
        ],
        [
          "📖",
          "Instructions",
          "Provide step-by-step guidance."
        ],
        [
          "❓",
          "FAQ",
          "Answer frequently asked questions."
        ]
      ]
    },

    {
      label: "03 • KNOWLEDGE LIFECYCLE",
      title: "Knowledge Article Lifecycle",

      flow: [
        "Draft",
        "Review",
        "Publish",
        "Use",
        "Retire"
      ],

      paragraphs: [
        "Knowledge content can move through stages from creation and review to publication and eventual retirement.",
        "The exact states and approval process depend on the organization's ServiceNow configuration."
      ]
    },

    {
      label: "04 • ARTICLE CONTENT",
      title: "What Should an Article Contain?",

      paragraphs: [
        "A useful knowledge article should provide clear and relevant information to its intended audience.",
        "The content should be easy to understand and should help the reader complete a task or solve a problem."
      ],

      cards: [
        [
          "🏷️",
          "Title",
          "Clearly describe what the article is about."
        ],
        [
          "📋",
          "Instructions",
          "Provide clear steps or useful information."
        ],
        [
          "🎯",
          "Audience",
          "Make the content appropriate for its intended users."
        ],
        [
          "🔄",
          "Maintenance",
          "Review and update content when information changes."
        ]
      ]
    },

    {
      label: "05 • REAL-WORLD EXAMPLE",
      title: "Password Reset Guide",

      scenario:
        "A Service Desk receives many requests asking how to reset a corporate password. The team creates a Knowledge Article containing the password reset steps. Users and support agents can then refer to the article whenever the same question occurs."
    },

    {
      label: "06 • KNOWLEDGE vs INCIDENT",
      title: "Understand the Difference",

      cards: [
        [
          "🚨",
          "Incident",
          "Tracks a specific interruption or degradation of a service."
        ],
        [
          "📚",
          "Knowledge",
          "Provides reusable information, instructions or solutions."
        ]
      ],

      paragraphs: [
        "If one user reports that their email is not working, an incident can be created to track that specific issue.",
        "If the support team creates an article explaining how to troubleshoot email problems, that information can be reused for future cases."
      ]
    },

    {
      label: "07 • BENEFITS",
      title: "How Knowledge Helps Support Teams",

      cards: [
        [
          "⚡",
          "Faster Answers",
          "Agents can reuse existing information instead of starting from scratch."
        ],
        [
          "👥",
          "Self-Service",
          "Users may be able to find information without contacting the Service Desk."
        ],
        [
          "📐",
          "Consistency",
          "Teams can use documented procedures and approved information."
        ],
        [
          "📈",
          "Continuous Improvement",
          "Frequently used knowledge can reveal opportunities to improve support."
        ]
      ]
    },

    {
      label: "08 • PRACTICE",
      title: "Think Like a Knowledge Manager",

      scenario:
        "The Service Desk receives the same question every day: ‘How do I connect to the company VPN?’ Ask yourself: Should the team answer the question from scratch every time, or create reusable knowledge that users and agents can access?"
    },

    {
      label: "09 • QUICK QUIZ",
      title: "What can be created to provide reusable information for users and support agents?",

      quiz: [
        "Knowledge Article",
        "Change Request",
        "Problem Record",
        "Incident Record"
      ],

      answer: "Knowledge Article"
    },

    {
      label: "10 • KEY TAKEAWAY",
      title: "Remember This",

      paragraphs: [
        "Knowledge Management is about capturing, organizing, sharing and maintaining useful information.",
        "Remember the simple idea: Create useful knowledge, review it, publish it, make it easy to find and keep it up to date."
      ]
    }

  ]
},
  
    
  "06": {
  title: "Service",
  gradient: "Catalog.",
  label: "ITSM • SERVICE CATALOG",
  description:
    "Learn how ServiceNow allows users to request services and items through a structured Service Catalog.",

  challenge: {
    title: "Think Like a Service Catalog Designer",

    scenario:
      "An employee needs a new laptop. Instead of sending an email to the IT team, the company wants the employee to select a laptop request from ServiceNow, provide the required information and submit the request.",

    question:
      "Which ServiceNow capability should normally be used?",

    options: [
      "Incident Management",
      "Problem Management",
      "Service Catalog",
      "Change Management"
    ],

    answer: "Service Catalog",

    explanation:
      "Service Catalog provides a structured way for users to request services and items from an organization."
  },

  interview: [
    {
      question: "What is Service Catalog in ServiceNow?",

      answer:
        "Service Catalog provides a structured way for users to request services, items and other offerings from an organization."
    },

    {
      question: "What is a Catalog Item?",

      answer:
        "A Catalog Item is a requestable item or service that users can select from the Service Catalog."
    },

    {
      question: "What are Variables in a Catalog Item?",

      answer:
        "Variables are fields used to collect information from the user when they request a catalog item."
    },

    {
      question: "What is the difference between REQ and RITM?",

      answer:
        "REQ represents the overall request submitted by a user, while RITM represents an individual requested item within that request."
    },

    {
      question: "What is a Catalog Task?",

      answer:
        "A Catalog Task is a task created to perform the work required to fulfill a requested catalog item."
    }
  ],

  sections: [

    {
      label: "01 • FUNDAMENTALS",
      title: "What is Service Catalog?",

      paragraphs: [
        "Service Catalog provides a structured way for users to request services and items from an organization.",
        "In ServiceNow, users can select a catalog item, provide the required information and submit their request.",
        "The request can then go through approvals, fulfillment activities and tasks depending on the organization's configuration."
      ],

      cards: [
        [
          "🛒",
          "Request",
          "Users can request available services and items."
        ],
        [
          "📝",
          "Information",
          "Users provide the information required to fulfill the request."
        ],
        [
          "⚙️",
          "Fulfillment",
          "Teams perform the work needed to complete the request."
        ]
      ]
    },

    {
      label: "02 • CATALOG ITEM",
      title: "What is a Catalog Item?",

      paragraphs: [
        "A Catalog Item is a requestable service or item that users can select from the Service Catalog.",
        "Examples can include requesting a laptop, software access, VPN access or another service provided by the organization."
      ],

      cards: [
        [
          "💻",
          "Laptop Request",
          "Request a new laptop or computer."
        ],
        [
          "🔐",
          "Software Access",
          "Request access to an application or software."
        ],
        [
          "🌐",
          "VPN Access",
          "Request access to a corporate VPN service."
        ]
      ]
    },

    {
      label: "03 • VARIABLES",
      title: "Collecting User Information",

      paragraphs: [
        "Catalog variables are used to collect information from the requester.",
        "For example, a laptop request may ask for the employee name, location, laptop type and required software."
      ],

      cards: [
        [
          "📝",
          "Text",
          "Collect text information from the requester."
        ],
        [
          "🔽",
          "Choice",
          "Allow the user to select from predefined options."
        ],
        [
          "👤",
          "Reference",
          "Allow the user to select a record from another table."
        ],
        [
          "☑️",
          "Checkbox",
          "Capture a yes/no style selection."
        ]
      ]
    },

    {
      label: "04 • REQUEST STRUCTURE",
      title: "REQ, RITM and Catalog Task",

      flow: [
        "Request",
        "Requested Item",
        "Catalog Task",
        "Fulfillment"
      ],

      paragraphs: [
        "A user can submit a request through the Service Catalog. The request can contain one or more requested items.",
        "Fulfillment work can then be handled through catalog tasks assigned to the appropriate teams."
      ],

      cards: [
        [
          "📦",
          "REQ",
          "Represents the overall request."
        ],
        [
          "📋",
          "RITM",
          "Represents an individual requested item."
        ],
        [
          "🛠️",
          "Catalog Task",
          "Represents work required to fulfill the requested item."
        ]
      ]
    },

    {
      label: "05 • APPROVALS",
      title: "Catalog Approval",

      paragraphs: [
        "Some catalog requests require approval before fulfillment can continue.",
        "The approval process depends on the organization's business requirements and ServiceNow configuration."
      ],

      cards: [
        [
          "👤",
          "Requester",
          "The person submitting the request."
        ],
        [
          "✅",
          "Approval",
          "An authorized person may need to approve the request."
        ],
        [
          "⚙️",
          "Fulfillment",
          "The responsible team performs the requested work."
        ]
      ]
    },

    {
      label: "06 • REAL-WORLD EXAMPLE",
      title: "New Laptop Request",

      scenario:
        "An employee joins a company and needs a laptop. The employee opens the Service Catalog, selects the laptop catalog item, provides the required information and submits the request. Depending on the organization's process, an approval may be required. After approval, fulfillment teams perform the required tasks and provide the laptop."
    },

    {
      label: "07 • CATALOG ITEM vs INCIDENT",
      title: "Understand the Difference",

      cards: [
        [
          "🛒",
          "Catalog Item",
          "Used when a user requests a service or item."
        ],
        [
          "🚨",
          "Incident",
          "Used when a service is interrupted or not working as expected."
        ]
      ],

      paragraphs: [
        "For example, requesting access to a new application can be handled through a catalog item.",
        "If an application that was previously working suddenly stops working, the situation may be handled as an incident."
      ]
    },

    {
      label: "08 • ORDER GUIDE",
      title: "What is an Order Guide?",

      paragraphs: [
        "An Order Guide can help users request multiple related items through a guided ordering experience.",
        "For example, when a new employee joins an organization, several related services or items may need to be requested together."
      ],

      cards: [
        [
          "📦",
          "Multiple Items",
          "Group related catalog requests together."
        ],
        [
          "🧭",
          "Guided Experience",
          "Help users provide information through a structured process."
        ],
        [
          "⚡",
          "Simplified Request",
          "Reduce the need for users to submit multiple separate requests."
        ]
      ]
    },

    {
      label: "09 • PRACTICE",
      title: "Think Like a Catalog Designer",

      scenario:
        "A new employee needs a laptop, email access and several standard software applications. Ask yourself: Which ServiceNow capability could provide a structured way for the employee or HR/IT team to request these services?"
    },

    {
      label: "10 • QUICK QUIZ",
      title: "What is used to collect information from a user in a Catalog Item?",

      quiz: [
        "Variables",
        "Incidents",
        "Problems",
        "Change Requests"
      ],

      answer: "Variables"
    },

    {
      label: "11 • KEY TAKEAWAY",
      title: "Remember This",

      paragraphs: [
        "Service Catalog provides a structured way for users to request services and items.",
        "Remember the basic flow: Select a Catalog Item → provide information through Variables → submit the Request → complete required approvals → fulfill the Requested Item through Catalog Tasks."
      ]
    }

  ]
},
  "07": {
  title: "Users, Groups",
  gradient: "& Roles.",
  label: "ITSM • USERS, GROUPS & ROLES",
  description:
    "Learn how ServiceNow organizes users, groups and roles to manage people, responsibilities and access.",

  challenge: {
    title: "Think Like a ServiceNow Administrator",

    scenario:
      "A new Service Desk employee joins the organization. The employee needs access to Service Desk records and should work as part of the Service Desk team.",

    question:
      "What should normally be used to organize the employee into the appropriate support team?",

    options: [
      "Group",
      "Incident",
      "Knowledge Article",
      "Catalog Item"
    ],

    answer: "Group",

    explanation:
      "Groups are commonly used to organize users into teams and can be used when assigning work and managing access."
  },

  interview: [
    {
      question: "What is a User in ServiceNow?",

      answer:
        "A User represents a person who can interact with the ServiceNow platform. User information is stored and managed in the User [sys_user] table."
    },

    {
      question: "What is a Group in ServiceNow?",

      answer:
        "A Group represents a collection of users, usually organized around a team, department or responsibility."
    },

    {
      question: "What is a Role in ServiceNow?",

      answer:
        "A Role is used to provide permissions that determine what users can access or perform in ServiceNow."
    },

    {
      question: "What is the difference between a Group and a Role?",

      answer:
        "A Group is mainly used to organize users and teams, while a Role is used to provide permissions and access."
    },

    {
      question: "Can a user have multiple roles?",

      answer:
        "Yes. A user can have multiple roles depending on the responsibilities and access required by the organization."
    }
  ],

  sections: [

    {
      label: "01 • FUNDAMENTALS",
      title: "Users, Groups and Roles",

      paragraphs: [
        "ServiceNow uses Users, Groups and Roles to organize people, teams and access within the platform.",
        "Understanding the difference between these three concepts is important for both administration and day-to-day ServiceNow operations."
      ],

      cards: [
        [
          "👤",
          "User",
          "Represents an individual person in ServiceNow."
        ],
        [
          "👥",
          "Group",
          "Represents a team or collection of users."
        ],
        [
          "🔐",
          "Role",
          "Provides permissions and access."
        ]
      ]
    },

    {
      label: "02 • USERS",
      title: "What is a User?",

      paragraphs: [
        "A User represents an individual person who can interact with ServiceNow.",
        "User records can contain information such as name, user ID, email, department, manager and other organizational details.",
        "The User table in ServiceNow is commonly referred to as sys_user."
      ],

      cards: [
        [
          "👤",
          "Identity",
          "Represents a specific person."
        ],
        [
          "🏢",
          "Organization",
          "User information can include department and other organizational details."
        ],
        [
          "🔐",
          "Access",
          "Users can receive roles and other access based on organizational requirements."
        ]
      ]
    },

    {
      label: "03 • GROUPS",
      title: "What is a Group?",

      paragraphs: [
        "A Group represents a collection of users who work together or share a common responsibility.",
        "Groups are commonly used for assigning work, organizing teams and supporting access management."
      ],

      cards: [
        [
          "🛠️",
          "Service Desk",
          "A group can represent the Service Desk team."
        ],
        [
          "💻",
          "Network Team",
          "A group can represent network support members."
        ],
        [
          "🗄️",
          "Database Team",
          "A group can represent database support members."
        ]
      ]
    },

    {
      label: "04 • ROLES",
      title: "What is a Role?",

      paragraphs: [
        "A Role is used to provide permissions in ServiceNow.",
        "Roles help determine what users are allowed to access or perform based on the organization's security configuration."
      ],

      cards: [
        [
          "🔐",
          "Permissions",
          "Roles can provide access to functionality and data."
        ],
        [
          "🛡️",
          "Security",
          "Roles are part of ServiceNow's access control model."
        ],
        [
          "⚙️",
          "Capabilities",
          "Different roles can provide different capabilities."
        ]
      ]
    },

    {
      label: "05 • GROUP vs ROLE",
      title: "Understand the Difference",

      cards: [
        [
          "👥",
          "Group",
          "Organizes users into teams or collections."
        ],
        [
          "🔐",
          "Role",
          "Provides permissions and access."
        ]
      ],

      paragraphs: [
        "For example, a user may belong to the Service Desk group.",
        "That same user may also have one or more roles that provide the permissions required to perform their work."
      ]
    },

    {
      label: "06 • REAL-WORLD EXAMPLE",
      title: "New Service Desk Employee",

      scenario:
        "A new employee joins the Service Desk. The administrator creates or updates the user's ServiceNow User record, adds the employee to the appropriate Service Desk group and provides the roles required for the employee's responsibilities."
    },

    {
      label: "07 • ASSIGNMENT GROUP",
      title: "Why Groups Matter for ITSM",

      paragraphs: [
        "Groups are especially important in ITSM because work can be assigned to teams rather than individual users.",
        "For example, an incident related to a network issue can be assigned to a Network support group."
      ],

      cards: [
        [
          "🎫",
          "Incident",
          "A support record needs to be handled."
        ],
        [
          "👥",
          "Assignment Group",
          "The responsible team receives the work."
        ],
        [
          "👤",
          "Assigned To",
          "A specific user can be assigned to perform the work."
        ]
      ]
    },

    {
      label: "08 • PRACTICE",
      title: "Think Like a ServiceNow Administrator",

      scenario:
        "A new Service Desk employee needs to work on incidents handled by the Service Desk team. Ask yourself: Which concept organizes the employee with the other Service Desk members, and which concept provides the required permissions?"
    },

    {
      label: "09 • QUICK QUIZ",
      title: "Which concept is primarily used to organize users into teams?",

      quiz: [
        "Group",
        "Role",
        "Incident",
        "Knowledge Article"
      ],

      answer: "Group"
    },

    {
      label: "10 • KEY TAKEAWAY",
      title: "Remember This",

      paragraphs: [
        "User = a person. Group = a collection of users or team. Role = permissions and access.",
        "In ITSM, groups are commonly used for assignment and team organization, while roles help control what users can access and perform."
      ]
    }

  ]
},
  "08": {
  title: "SLA &",
  gradient: "SLM.",
  label: "ITSM • SLA & SLM",
  description:
    "Learn how ServiceNow tracks service-level commitments, task SLAs, targets, breaches and service-level management.",

  challenge: {
    title: "Think Like an ITSM Analyst",

    scenario:
      "A company has agreed that high-priority incidents must be responded to within 30 minutes. The support team wants ServiceNow to track whether the agreed response time is being met.",

    question:
      "Which capability is commonly used to track this time-based commitment?",

    options: [
      "SLA",
      "Knowledge Article",
      "Catalog Item",
      "Problem Record"
    ],

    answer: "SLA",

    explanation:
      "A Service Level Agreement (SLA) defines a service-level commitment, and ServiceNow can track SLA timing against applicable tasks."
  },

  interview: [
    {
      question: "What is an SLA?",

      answer:
        "SLA stands for Service Level Agreement. It defines an agreed level of service or measurable commitment between parties."
    },

    {
      question: "What is SLM?",

      answer:
        "SLM stands for Service Level Management. It focuses on defining, monitoring and managing service-level commitments and performance."
    },

    {
      question: "What is a Task SLA in ServiceNow?",

      answer:
        "A Task SLA is a record that tracks SLA timing and conditions against a task, such as an incident."
    },

    {
      question: "What is an SLA breach?",

      answer:
        "An SLA breach occurs when the applicable service-level target is not met within the defined conditions and time."
    },

    {
      question: "What is the difference between SLA and SLM?",

      answer:
        "An SLA represents a specific service-level commitment, while SLM is the broader process of managing and monitoring service levels."
    }
  ],

  sections: [

    {
      label: "01 • FUNDAMENTALS",
      title: "What is an SLA?",

      paragraphs: [
        "SLA stands for Service Level Agreement.",
        "An SLA defines a service-level commitment, such as a response or resolution target that should be met for a particular service or type of work.",
        "In ServiceNow, SLA definitions can be used to measure time against applicable tasks."
      ],

      cards: [
        [
          "⏱️",
          "Time Target",
          "Define a measurable time-based commitment."
        ],
        [
          "🎯",
          "Target",
          "Specify what should be achieved within the agreed time."
        ],
        [
          "📊",
          "Tracking",
          "Monitor progress against the defined commitment."
        ]
      ]
    },

    {
      label: "02 • SLM",
      title: "What is Service Level Management?",

      paragraphs: [
        "SLM stands for Service Level Management.",
        "SLM is the broader practice of defining, monitoring and managing service-level commitments and performance.",
        "It helps organizations understand whether agreed service levels are being achieved."
      ],

      cards: [
        [
          "📋",
          "Define",
          "Establish service-level expectations."
        ],
        [
          "📊",
          "Monitor",
          "Track service performance against targets."
        ],
        [
          "🔄",
          "Improve",
          "Identify opportunities to improve service performance."
        ]
      ]
    },

    {
      label: "03 • TASK SLA",
      title: "What is a Task SLA?",

      paragraphs: [
        "A Task SLA tracks SLA timing against a task in ServiceNow.",
        "For example, an incident can have an SLA that measures the time allowed for response or resolution.",
        "The exact conditions and targets depend on the organization's SLA configuration."
      ],

      cards: [
        [
          "🎫",
          "Task",
          "The SLA can be associated with an applicable task."
        ],
        [
          "⏱️",
          "Timer",
          "The SLA tracks applicable time."
        ],
        [
          "📈",
          "Progress",
          "The task can be monitored against its target."
        ]
      ]
    },

    {
      label: "04 • SLA LIFECYCLE",
      title: "SLA Timing",

      flow: [
        "Start",
        "In Progress",
        "Pause",
        "Resume",
        "Complete"
      ],

      paragraphs: [
        "Depending on the configured conditions, an SLA timer can start when its conditions are met.",
        "The timer may pause when defined pause conditions are met and resume when those conditions are no longer applicable.",
        "The exact behavior depends on the SLA definition and configuration."
      ]
    },

    {
      label: "05 • RESPONSE vs RESOLUTION",
      title: "Different SLA Targets",

      paragraphs: [
        "Organizations can define different service-level targets for different activities.",
        "For example, one SLA may measure how quickly a support team responds to an incident, while another may measure how quickly the incident should be resolved."
      ],

      cards: [
        [
          "📞",
          "Response",
          "Measures how quickly the support team responds."
        ],
        [
          "🛠️",
          "Resolution",
          "Measures how quickly the issue is resolved."
        ],
        [
          "🎯",
          "Target",
          "Defines the expected time for the applicable activity."
        ]
      ]
    },

    {
      label: "06 • SLA BREACH",
      title: "What is an SLA Breach?",

      paragraphs: [
        "An SLA breach occurs when the applicable service-level target is not met according to the configured SLA conditions.",
        "Breaches can be monitored and reported so organizations can understand where service-level commitments are not being achieved."
      ],

      cards: [
        [
          "⚠️",
          "At Risk",
          "The target is approaching and action may be required."
        ],
        [
          "🔴",
          "Breached",
          "The applicable target was not met."
        ],
        [
          "📊",
          "Analyze",
          "Review performance and identify improvement opportunities."
        ]
      ]
    },

    {
      label: "07 • REAL-WORLD EXAMPLE",
      title: "High-Priority Incident",

      scenario:
        "A company defines a response target for high-priority incidents. When a qualifying incident is created, the applicable SLA begins tracking. The support team responds within the target time, and the SLA completes according to the configured conditions."
    },

    {
      label: "08 • SLA & INCIDENT",
      title: "How SLA Works with ITSM",

      paragraphs: [
        "SLA tracking is commonly used with ITSM records such as incidents and other applicable tasks.",
        "This allows support teams and managers to monitor whether work is progressing within defined service-level targets."
      ],

      cards: [
        [
          "🎫",
          "Incident",
          "The ITSM record being worked on."
        ],
        [
          "⏱️",
          "SLA",
          "Tracks the applicable service-level target."
        ],
        [
          "📊",
          "Performance",
          "Helps measure whether targets are being achieved."
        ]
      ]
    },

    {
      label: "09 • PRACTICE",
      title: "Think Like an ITSM Analyst",

      scenario:
        "A critical incident has a defined resolution target. The support team is still working on the issue and the target time is getting close. Ask yourself: What should the team monitor to understand whether the agreed service-level target is at risk?"
    },

    {
      label: "10 • QUICK QUIZ",
      title: "What does SLA stand for?",

      quiz: [
        "Service Level Agreement",
        "Service Login Access",
        "System Level Application",
        "Service List Administration"
      ],

      answer: "Service Level Agreement"
    },

    {
      label: "11 • KEY TAKEAWAY",
      title: "Remember This",

      paragraphs: [
        "SLA = Service Level Agreement. SLM = Service Level Management.",
        "Remember the basic idea: an SLA defines a service-level commitment, while ServiceNow can track applicable SLA timing against tasks so teams can monitor performance and breaches."
      ]
    }

  ]
},
 "09": {
  title: "Business",
  gradient: "Rules.",
  label: "ITSM • BUSINESS RULES",
  description:
    "Learn how ServiceNow Business Rules automate server-side logic when records are inserted, updated, deleted or queried.",

  challenge: {
    title: "Think Like a ServiceNow Developer",

    scenario:
      "Whenever an incident is updated, the organization wants server-side logic to automatically set a field based on the incident data.",

    question:
      "Which ServiceNow feature is commonly used for this type of server-side automation?",

    options: [
      "Business Rule",
      "Client Script",
      "Catalog Item",
      "Knowledge Article"
    ],

    answer: "Business Rule",

    explanation:
      "Business Rules are server-side scripts that can run when records are inserted, updated, deleted or queried, depending on their configuration."
  },

  interview: [
    {
      question: "What is a Business Rule?",

      answer:
        "A Business Rule is a server-side script that runs when a record is inserted, updated, deleted or queried, depending on its configuration."
    },

    {
      question: "When can a Business Rule execute?",

      answer:
        "Business Rules can be configured to execute before, after, asynchronously or during query processing, depending on the requirement."
    },

    {
      question: "What is the difference between Before and After Business Rules?",

      answer:
        "A Before Business Rule runs before the database operation is completed and can be used to modify the current record. An After Business Rule runs after the database operation."
    },

    {
      question: "What is an Async Business Rule?",

      answer:
        "An Async Business Rule runs asynchronously after the database operation, allowing processing that does not need to block the user's transaction."
    },

    {
      question: "What is the difference between a Business Rule and a Client Script?",

      answer:
        "A Business Rule runs on the server, while a Client Script runs in the user's browser and is used for client-side behavior."
    }
  ],

  sections: [

    {
      label: "01 • FUNDAMENTALS",
      title: "What is a Business Rule?",

      paragraphs: [
        "A Business Rule is a server-side script used to automate logic when records are processed in ServiceNow.",
        "Business Rules can be configured to run during different stages of database operations.",
        "They are commonly used when logic needs to execute on the server rather than in the user's browser."
      ],

      cards: [
        [
          "⚙️",
          "Server-Side",
          "Business Rules execute on the ServiceNow server."
        ],
        [
          "🔄",
          "Automation",
          "They can automate actions when records are processed."
        ],
        [
          "📝",
          "Record Logic",
          "They can work with record data using server-side APIs."
        ]
      ]
    },

    {
      label: "02 • WHEN TO RUN",
      title: "Business Rule Timing",

      flow: [
        "Before",
        "Database Operation",
        "After",
        "Async"
      ],

      paragraphs: [
        "Business Rules can be configured with different execution timings depending on the requirement.",
        "Before rules execute before the database operation, After rules execute after the database operation, and Async rules execute asynchronously after the operation.",
        "Query Business Rules can also be used during query processing."
      ]
    },

    {
      label: "03 • BEFORE",
      title: "Before Business Rule",

      paragraphs: [
        "A Before Business Rule runs before the record is written to the database.",
        "It can be useful when you need to modify values on the current record before the database operation is completed."
      ],

      cards: [
        [
          "⏮️",
          "Before Save",
          "Runs before the database operation is completed."
        ],
        [
          "✏️",
          "Modify Record",
          "Can be used to set or change field values."
        ],
        [
          "⚡",
          "Same Transaction",
          "Runs as part of the current server transaction."
        ]
      ]
    },

    {
      label: "04 • AFTER",
      title: "After Business Rule",

      paragraphs: [
        "An After Business Rule runs after the database operation has completed.",
        "It can be useful when server-side processing needs to happen after the current record has been saved."
      ],

      cards: [
        [
          "⏭️",
          "After Save",
          "Runs after the database operation."
        ],
        [
          "🔗",
          "Related Processing",
          "Can be used for logic involving related records or follow-up processing."
        ],
        [
          "🖥️",
          "Server Logic",
          "The logic executes on the ServiceNow server."
        ]
      ]
    },

    {
      label: "05 • ASYNC & QUERY",
      title: "Async and Query Business Rules",

      paragraphs: [
        "An Async Business Rule runs asynchronously after the database operation. It can be useful when processing does not need to block the user's transaction.",
        "A Query Business Rule can run when records are queried and can be used for server-side query-related logic."
      ],

      cards: [
        [
          "⚡",
          "Async",
          "Runs asynchronously after the database operation."
        ],
        [
          "🔎",
          "Query",
          "Runs during query processing."
        ]
      ]
    },

    {
      label: "06 • REAL-WORLD EXAMPLE",
      title: "Automatic Incident Update",

      scenario:
        "An organization wants to automatically set a field on an incident whenever certain server-side conditions are met. A Business Rule can evaluate the incident record and update the appropriate value on the server."
    },

    {
      label: "07 • BUSINESS RULE vs CLIENT SCRIPT",
      title: "Understand the Difference",

      cards: [
        [
          "🖥️",
          "Business Rule",
          "Server-side logic that executes on the ServiceNow server."
        ],
        [
          "🌐",
          "Client Script",
          "Client-side logic that executes in the user's browser."
        ]
      ],

      paragraphs: [
        "Use server-side logic when the requirement needs to be enforced or processed on the server.",
        "Use client-side logic when the requirement is related to the user's form experience in the browser."
      ]
    },

    {
      label: "08 • PRACTICAL EXAMPLE",
      title: "Using GlideRecord",

      paragraphs: [
        "Business Rules can use server-side ServiceNow APIs such as GlideRecord to work with records.",
        "For example, server-side logic can query or update records when the Business Rule conditions are met."
      ],

      code: `var gr = new GlideRecord('incident');
gr.addQuery('priority', 1);
gr.query();

while (gr.next()) {
  gs.info(gr.number);
}`,

      explanation: [
        [
          "GlideRecord",
          "Used to work with records in ServiceNow tables."
        ],
        [
          "addQuery()",
          "Adds a condition to the database query."
        ],
        [
          "query()",
          "Executes the query."
        ],
        [
          "next()",
          "Moves through the returned records."
        ]
      ]
    },

    {
      label: "09 • PRACTICE",
      title: "Think Like a ServiceNow Developer",

      scenario:
        "You need server-side logic that automatically runs when an incident is updated. Ask yourself: Should this logic execute in the browser or on the ServiceNow server?"
    },

    {
      label: "10 • QUICK QUIZ",
      title: "Where does a Business Rule execute?",

      quiz: [
        "Browser",
        "ServiceNow Server",
        "User's Computer Only",
        "Mobile Device Only"
      ],

      answer: "ServiceNow Server"
    },

    {
      label: "11 • KEY TAKEAWAY",
      title: "Remember This",

      paragraphs: [
        "Business Rule = server-side automation.",
        "Remember the common timings: Before, After, Async and Query.",
        "Before is commonly used when values need to be changed before the database operation, while After runs after the operation."
      ]
    }

  ]
},
  "10": {
  title: "Client",
  gradient: "Scripts.",
  label: "ITSM • CLIENT SCRIPTS",
  description:
    "Learn how ServiceNow Client Scripts control form behavior in the user's browser using onLoad, onChange, onSubmit and onCellEdit.",

  challenge: {
    title: "Think Like a ServiceNow Developer",

    scenario:
      "When a user opens an Incident form, the organization wants a field to be automatically populated or adjusted immediately on the form.",

    question:
      "Which Client Script type is commonly used when the form loads?",

    options: [
      "onLoad",
      "onChange",
      "onSubmit",
      "onCellEdit"
    ],

    answer: "onLoad",

    explanation:
      "An onLoad Client Script runs when the form is loaded in the user's browser."
  },

  interview: [
    {
      question: "What is a Client Script?",

      answer:
        "A Client Script is client-side JavaScript used to control form behavior in the user's browser."
    },

    {
      question: "What are the types of Client Scripts?",

      answer:
        "The common Client Script types are onLoad, onChange, onSubmit and onCellEdit."
    },

    {
      question: "What is an onLoad Client Script?",

      answer:
        "An onLoad Client Script runs when a form is loaded and can be used to set or modify form behavior when the user opens the record."
    },

    {
      question: "What is an onChange Client Script?",

      answer:
        "An onChange Client Script runs when the value of a specified field changes on the form."
    },

    {
      question: "What is the difference between Client Script and Business Rule?",

      answer:
        "A Client Script runs in the user's browser and controls the form experience, while a Business Rule runs on the ServiceNow server."
    }
  ],

  sections: [

    {
      label: "01 • FUNDAMENTALS",
      title: "What is a Client Script?",

      paragraphs: [
        "A Client Script is client-side JavaScript used to control the behavior of a ServiceNow form in the user's browser.",
        "Client Scripts can be used to make fields mandatory, visible, read-only or to perform other form-related actions.",
        "Because Client Scripts execute on the client side, they are mainly used for the user's form experience."
      ],

      cards: [
        [
          "🌐",
          "Client-Side",
          "The script executes in the user's browser."
        ],
        [
          "📝",
          "Form Behavior",
          "Control how fields behave on a form."
        ],
        [
          "⚡",
          "Interactive",
          "Respond to actions performed by the user."
        ]
      ]
    },

    {
      label: "02 • TYPES",
      title: "Four Common Client Script Types",

      flow: [
        "onLoad",
        "onChange",
        "onSubmit",
        "onCellEdit"
      ],

      paragraphs: [
        "ServiceNow provides different Client Script types for different form interactions.",
        "The appropriate type depends on when the client-side logic needs to execute."
      ]
    },

    {
      label: "03 • ONLOAD",
      title: "onLoad Client Script",

      paragraphs: [
        "An onLoad Client Script runs when a form is loaded in the user's browser.",
        "It can be used when you want to modify the form immediately after it opens."
      ],

      code: `function onLoad() {
  g_form.setReadOnly('short_description', true);
}`,

      explanation: [
        [
          "onLoad()",
          "Runs when the form loads."
        ],
        [
          "g_form",
          "Provides client-side APIs for working with the form."
        ],
        [
          "setReadOnly()",
          "Makes the specified field read-only."
        ]
      ]
    },

    {
      label: "04 • ONCHANGE",
      title: "onChange Client Script",

      paragraphs: [
        "An onChange Client Script runs when the value of a specified field changes.",
        "It is commonly used when the behavior of one field should depend on another field's value."
      ],

      code: `function onChange(control, oldValue, newValue, isLoading) {

  if (isLoading) {
    return;
  }

  if (newValue == '1') {
    g_form.setMandatory('description', true);
  }
}`,

      explanation: [
        [
          "newValue",
          "Contains the new value of the field."
        ],
        [
          "isLoading",
          "Can be checked to avoid executing logic during initial form loading."
        ],
        [
          "setMandatory()",
          "Makes a field mandatory on the form."
        ]
      ]
    },

    {
      label: "05 • ONSUBMIT",
      title: "onSubmit Client Script",

      paragraphs: [
        "An onSubmit Client Script runs when the user attempts to submit the form.",
        "It can be used to validate information before the form is submitted."
      ],

      code: `function onSubmit() {

  if (g_form.getValue('short_description') == '') {
    g_form.addErrorMessage(
      'Please provide a short description.'
    );

    return false;
  }

  return true;
}`,

      explanation: [
        [
          "onSubmit()",
          "Runs when the user submits the form."
        ],
        [
          "getValue()",
          "Gets the current value of a field."
        ],
        [
          "return false",
          "Prevents the form submission."
        ],
        [
          "return true",
          "Allows the form submission to continue."
        ]
      ]
    },

    {
      label: "06 • ONCELLEDIT",
      title: "onCellEdit Client Script",

      paragraphs: [
        "An onCellEdit Client Script is used when a user edits a cell directly in a list.",
        "It is useful for controlling or validating certain list-editing scenarios."
      ],

      cards: [
        [
          "📋",
          "List",
          "Works with list editing."
        ],
        [
          "✏️",
          "Cell Edit",
          "Runs when a user changes a value directly in a list cell."
        ],
        [
          "✅",
          "Validation",
          "Can be used to validate the change."
        ]
      ]
    },

    {
      label: "07 • G_FORM",
      title: "The g_form Object",

      paragraphs: [
        "The g_form object provides client-side methods for interacting with fields and the form.",
        "It is one of the most commonly used APIs when developing Client Scripts."
      ],

      cards: [
        [
          "👁️",
          "setVisible()",
          "Control field visibility."
        ],
        [
          "🔒",
          "setReadOnly()",
          "Control whether a field can be edited."
        ],
        [
          "📌",
          "setMandatory()",
          "Make a field mandatory or optional."
        ],
        [
          "📖",
          "getValue()",
          "Read the value of a field."
        ]
      ]
    },

    {
      label: "08 • CLIENT vs SERVER",
      title: "Client Script vs Business Rule",

      cards: [
        [
          "🌐",
          "Client Script",
          "Runs in the user's browser and controls the form experience."
        ],
        [
          "🖥️",
          "Business Rule",
          "Runs on the ServiceNow server."
        ]
      ],

      paragraphs: [
        "Use Client Scripts for client-side form behavior such as making fields mandatory, visible or read-only.",
        "Use server-side logic such as Business Rules when the logic needs to execute on the ServiceNow server."
      ]
    },

    {
      label: "09 • PRACTICE",
      title: "Think Like a ServiceNow Developer",

      scenario:
        "You want a field to become mandatory whenever the user selects a particular value in another field. Ask yourself: Which Client Script type would be appropriate?"
    },

    {
      label: "10 • QUICK QUIZ",
      title: "Which Client Script runs when a form is loaded?",

      quiz: [
        "onLoad",
        "onChange",
        "onSubmit",
        "onCellEdit"
      ],

      answer: "onLoad"
    },

    {
      label: "11 • KEY TAKEAWAY",
      title: "Remember This",

      paragraphs: [
        "Client Script = client-side form behavior.",
        "Remember the four common types: onLoad, onChange, onSubmit and onCellEdit.",
        "Use g_form to interact with fields and the form from client-side scripts."
      ]
    }

  ]
},
  "11": {
  title: "Access",
  gradient: "Control.",
  label: "ITSM • ACCESS CONTROL",
  description:
    "Learn how ServiceNow Access Control Rules (ACLs) control who can access records and fields.",

  challenge: {
    title: "Think Like a ServiceNow Administrator",

    scenario:
      "A company wants only authorized users to view sensitive incident information. The administrator needs to control access to the incident data.",

    question:
      "Which ServiceNow security mechanism is commonly used to control access to records and fields?",

    options: [
      "ACL",
      "Catalog Item",
      "Knowledge Article",
      "SLA"
    ],

    answer: "ACL",

    explanation:
      "Access Control Rules (ACLs) are used to control access to records and fields based on configured conditions, roles and scripts."
  },

  interview: [
    {
      question: "What is an ACL in ServiceNow?",

      answer:
        "ACL stands for Access Control List. An ACL is a security rule used to control access to records and fields."
    },

    {
      question: "What are the common ACL operations?",

      answer:
        "Common ACL operations include create, read, write and delete. Other operations can also exist depending on the table and configuration."
    },

    {
      question: "What is the difference between a table ACL and a field ACL?",

      answer:
        "A table-level ACL controls access to records or operations on a table, while a field-level ACL controls access to a specific field."
    },

    {
      question: "What can an ACL use to determine access?",

      answer:
        "Depending on the ACL configuration, access can be evaluated using roles, conditions and scripts."
    },

    {
      question: "What is the purpose of ACLs?",

      answer:
        "ACLs help protect ServiceNow data by controlling which users can perform specific operations on records and fields."
    }
  ],

  sections: [

    {
      label: "01 • FUNDAMENTALS",
      title: "What is Access Control?",

      paragraphs: [
        "Access Control determines who can access data and perform operations in ServiceNow.",
        "ServiceNow uses Access Control Rules, commonly called ACLs, to control access to records and fields.",
        "ACLs are an important part of ServiceNow's security model."
      ],

      cards: [
        [
          "🔐",
          "Security",
          "Protect ServiceNow data from unauthorized access."
        ],
        [
          "👤",
          "Users",
          "Determine whether a user should have access."
        ],
        [
          "📋",
          "Records & Fields",
          "Control access to tables, records and fields."
        ]
      ]
    },

    {
      label: "02 • ACL OPERATIONS",
      title: "Common ACL Operations",

      cards: [
        [
          "👁️",
          "Read",
          "Controls whether a user can read data."
        ],
        [
          "✏️",
          "Write",
          "Controls whether a user can modify data."
        ],
        [
          "➕",
          "Create",
          "Controls whether a user can create records."
        ],
        [
          "🗑️",
          "Delete",
          "Controls whether a user can delete records."
        ]
      ]
    },

    {
      label: "03 • TABLE ACL",
      title: "Table-Level Access",

      paragraphs: [
        "A table-level ACL can control access to records or operations associated with a table.",
        "For example, an ACL can determine whether a user can read or modify records in the Incident table."
      ],

      cards: [
        [
          "📋",
          "Table",
          "Defines the table to which the security rule applies."
        ],
        [
          "👁️",
          "Operation",
          "Defines what operation is being controlled."
        ],
        [
          "🔐",
          "Access",
          "Determines whether the user is allowed to perform the operation."
        ]
      ]
    },

    {
      label: "04 • FIELD ACL",
      title: "Field-Level Access",

      paragraphs: [
        "A field-level ACL can control access to a specific field.",
        "This can be useful when a particular field contains information that should have additional access restrictions."
      ],

      cards: [
        [
          "🎯",
          "Specific Field",
          "The rule can apply to an individual field."
        ],
        [
          "🔒",
          "Restricted Data",
          "Sensitive information can receive additional protection."
        ],
        [
          "👤",
          "User Access",
          "Access can depend on the user's permissions."
        ]
      ]
    },

    {
      label: "05 • ACL CONDITIONS",
      title: "How Can an ACL Evaluate Access?",

      paragraphs: [
        "ACL configuration can use different mechanisms to determine whether access should be granted.",
        "Depending on the requirement, roles, conditions and scripts can be used as part of the access evaluation."
      ],

      cards: [
        [
          "🎭",
          "Role",
          "Access can depend on whether the user has an appropriate role."
        ],
        [
          "🔎",
          "Condition",
          "A condition can evaluate record information."
        ],
        [
          "💻",
          "Script",
          "Server-side scripting can be used for more advanced access logic."
        ]
      ]
    },

    {
      label: "06 • REAL-WORLD EXAMPLE",
      title: "Protecting Sensitive Incident Data",

      scenario:
        "An organization stores sensitive information in certain incident fields. The administrator creates appropriate access controls so that only authorized users can access the protected information."
    },

    {
      label: "07 • ACCESS EVALUATION",
      title: "What Happens When Access Is Requested?",

      flow: [
        "User Request",
        "ACL Evaluation",
        "Roles / Conditions",
        "Access Decision"
      ],

      paragraphs: [
        "When a user attempts an operation, ServiceNow evaluates the applicable access controls.",
        "The ACL configuration determines whether the user is allowed to perform the requested operation."
      ]
    },

    {
      label: "08 • PRACTICE",
      title: "Think Like a ServiceNow Administrator",

      scenario:
        "A user can open an Incident record but should not be allowed to modify it. Ask yourself: Which ACL operation would you investigate to control whether the user can modify the record?"
    },

    {
      label: "09 • QUICK QUIZ",
      title: "Which ACL operation controls whether a user can modify a record?",

      quiz: [
        "Read",
        "Write",
        "Create",
        "Delete"
      ],

      answer: "Write"
    },

    {
      label: "10 • KEY TAKEAWAY",
      title: "Remember This",

      paragraphs: [
        "ACL = Access Control List. ACLs are used to control access to ServiceNow records and fields.",
        "Remember the common operations: Read, Write, Create and Delete.",
        "ACL evaluation can involve roles, conditions and scripts depending on the configuration."
      ]
    }

  ]
},
 "12": {
  title: "Reporting &",
  gradient: "Dashboards.",
  label: "ITSM • REPORTING & DASHBOARDS",
  description:
    "Learn how ServiceNow reports and dashboards help teams analyze ITSM data, identify trends, and make better decisions.",

  challenge: {
    question:
      "A manager wants to see how many incidents exist for each priority. What would you use?",
    options: [
      "Report",
      "Business Rule",
      "ACL",
      "Catalog Item"
    ],
    answer: "Report"
  },

  interview: [
    {
      question: "What is a report in ServiceNow?",
      answer:
        "A report is a visual representation of ServiceNow data. It helps users analyze records using charts, tables, and other visual formats."
    },
    {
      question: "What is a dashboard?",
      answer:
        "A dashboard is a collection of reports and other visual components displayed together on a single page."
    },
    {
      question: "What are filters used for in reports?",
      answer:
        "Filters are used to display only the records that match specific conditions, such as Priority is 1 or State is Open."
    },
    {
      question: "What is the difference between a report and a dashboard?",
      answer:
        "A report normally represents a specific data analysis, while a dashboard can contain multiple reports and visualizations in one place."
    },
    {
      question: "Why is grouping useful in reports?",
      answer:
        "Grouping organizes records based on a field, such as Priority, Assignment Group, or State, making the data easier to understand."
    }
  ],

  sections: [
    {
      title: "What is Reporting?",
      paragraphs: [
        "Reporting means analyzing ServiceNow data and presenting it in an easy-to-understand format.",
        "ServiceNow contains thousands of records such as Incidents, Problems, Changes, Requests, and Tasks.",
        "Reports help teams understand what is happening with this data."
      ],
      cards: [
        {
          title: "Analyze",
          text: "Understand the information stored in ServiceNow."
        },
        {
          title: "Visualize",
          text: "Display data using charts, graphs, and tables."
        },
        {
          title: "Decide",
          text: "Use the information to support operational decisions."
        }
      ]
    },

    {
      title: "What is a Report?",
      paragraphs: [
        "A report is a way of displaying ServiceNow records in a visual format.",
        "For example, an Incident report can show how many incidents are currently Open, In Progress, or Resolved.",
        "Reports can be created on different ServiceNow tables."
      ],
      scenario: {
        title: "Simple Example",
        text:
          "A Service Desk manager wants to know how many incidents are assigned to each support group. A report can group incidents by Assignment Group and display the result as a chart."
      }
    },

    {
      title: "Common Report Visualizations",
      paragraphs: [
        "ServiceNow provides different visualization options depending on the type of information you want to understand.",
        "The visualization should match the question you are trying to answer."
      ],
      cards: [
        {
          title: "Bar Chart",
          text: "Useful for comparing values between categories."
        },
        {
          title: "Pie Chart",
          text: "Useful for showing how records are distributed between categories."
        },
        {
          title: "List",
          text: "Useful when you need to see individual records and their fields."
        },
        {
          title: "Trend",
          text: "Useful for understanding how data changes over time."
        }
      ]
    },

    {
      title: "Filters & Conditions",
      paragraphs: [
        "Reports can use filters to control which records are included.",
        "A filter is created using conditions on fields.",
        "For example, you may want to report only incidents where State is Open."
      ],
      flow: [
        "Incident table",
        "Apply filter",
        "State = Open",
        "Display matching incidents"
      ],
      scenario: {
        title: "Example",
        text:
          "You have 5,000 incidents in the system, but the manager wants to see only Priority 1 incidents. Add a filter where Priority is 1."
      }
    },

    {
      title: "Grouping & Aggregation",
      paragraphs: [
        "Grouping organizes records based on a particular field.",
        "For example, incidents can be grouped by Priority, State, Assignment Group, or Category.",
        "Aggregation allows you to summarize data, such as counting the number of incidents."
      ],
      cards: [
        {
          title: "Group By",
          text: "Organizes records based on a field."
        },
        {
          title: "Count",
          text: "Shows how many records exist in each group."
        },
        {
          title: "Average",
          text: "Can be used to calculate an average value when appropriate."
        }
      ],
      scenario: {
        title: "Incident Example",
        text:
          "If a report groups incidents by Priority, you may see 10 Priority 1 incidents, 35 Priority 2 incidents, and 80 Priority 3 incidents."
      }
    },

    {
      title: "Real-World Example: Incident Report",
      paragraphs: [
        "Imagine a Service Desk manager asks: How many incidents do we have for each priority?",
        "You can create a report using the Incident table.",
        "Then group the records by Priority and count the incidents."
      ],
      flow: [
        "Incident table",
        "Select report",
        "Group by Priority",
        "Count records",
        "Display chart"
      ],
      explanation: {
        title: "Result",
        text:
          "The manager can quickly understand the distribution of incidents across different priorities without manually checking every incident."
      }
    },

    {
      title: "What is a Dashboard?",
      paragraphs: [
        "A dashboard is a single page that can display multiple reports and visual components.",
        "Dashboards are useful when users need to monitor several areas of information at the same time.",
        "For example, a Service Desk dashboard may contain incident trends, incidents by priority, SLA information, and incidents by assignment group."
      ],
      cards: [
        {
          title: "Incident Trend",
          text: "Shows how incident volume changes over time."
        },
        {
          title: "Priority Report",
          text: "Shows incidents grouped by priority."
        },
        {
          title: "Assignment Group",
          text: "Shows workload across support teams."
        }
      ]
    },

    {
      title: "Reports vs Dashboards",
      paragraphs: [
        "Reports and dashboards are related, but they serve different purposes.",
        "A report normally focuses on a particular data analysis.",
        "A dashboard brings multiple visual components together in one place."
      ],
      cards: [
        {
          title: "Report",
          text: "Focuses on a specific data analysis or visualization."
        },
        {
          title: "Dashboard",
          text: "Combines multiple reports and components into one view."
        }
      ],
      scenario: {
        title: "Easy Way to Remember",
        text:
          "Think of a report as one analysis and a dashboard as a screen containing multiple analyses."
      }
    },

    {
      title: "Practice",
      paragraphs: [
        "Let's apply what you learned."
      ],
      challenge: {
        question:
          "Your manager wants to see the number of incidents grouped by Assignment Group. What should you create?",
        options: [
          "Report",
          "Client Script",
          "ACL",
          "Business Rule"
        ],
        answer: "Report"
      }
    },

    {
      title: "Quick Quiz",
      quiz: {
        question:
          "What is used to visualize and analyze ServiceNow data?",
        options: [
          "Report",
          "ACL",
          "Client Script",
          "Catalog Task"
        ],
        answer: "Report"
      }
    },

    {
      title: "Remember This",
      paragraphs: [
        "Reports help you analyze ServiceNow data.",
        "Filters control which records appear in a report.",
        "Grouping organizes records by a field.",
        "Dashboards bring multiple reports and visual components together.",
        "Always choose the visualization that makes the data easiest to understand."
      ],
      cards: [
        {
          title: "Report",
          text: "Analyze and visualize data."
        },
        {
          title: "Filter",
          text: "Control which records are included."
        },
        {
          title: "Group",
          text: "Organize records by a field."
        },
        {
          title: "Dashboard",
          text: "Combine multiple visualizations."
        }
      ]
    }
  ]
},}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({ page, setPage, setShowSearch }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-icon"></div>
        <div className="brand-details">
          <div className="brand-name">Snow<span>Hub</span></div>
          <div className="brand-signature"><span></span><em>By Siva</em><span></span></div>
        </div>
      </div>

      <div className="nav-links">
        <a href="#home" className={page === "home" ? "active" : ""} onClick={(e) => { e.preventDefault(); setPage("home"); }}>Home</a>
        <a href="#courses" className={page === "courses" ? "active" : ""} onClick={(e) => { e.preventDefault(); setPage("courses"); }}>Courses</a>
        <a href="#interview" className={page === "interview" ? "active" : ""} onClick={(e) => { e.preventDefault(); setPage("interview"); }}>Interview</a>
        <a href="#about" className={page === "about" ? "active" : ""} onClick={(e) => { e.preventDefault(); setPage("about"); }}>About</a>
      </div>

     <button
  className="search-btn"
  aria-label="Search"
  onClick={() => setShowSearch(true)}
>
  <span className="search-icon"></span>
</button>
    </nav>
  );
}

/* =========================================================
   HOME
========================================================= */

function HomePage({ setPage }) {
  return (
    <>
      <section className="hero">
        <div className="stars stars-one"></div>
        <div className="stars stars-two"></div>
        <div className="stars stars-three"></div>
        <div className="nebula nebula-blue"></div>
        <div className="nebula nebula-purple"></div>

        <div className="hero-content">
          <div className="hero-label"><span>✦</span> SERVICENOW LEARNING PLATFORM</div>
          <h1>Master ServiceNow.<br /><span>Build Your Future.</span></h1>
          <p className="hero-description">Learn ServiceNow through practical tutorials, real-world examples, scripts, integrations, interview preparation and hands-on learning.</p>
          <button className="start-btn" onClick={() => setPage("courses")}>Start Learning <span>→</span></button>

          <div className="stats">
            <div className="stat-item"><strong>12</strong><span>ITSM Topics</span></div>
            <div className="stat-line"></div>
            <div className="stat-item"><strong>100+</strong><span>Tutorial Ideas</span></div>
            <div className="stat-line"></div>
            <div className="stat-item"><strong>Free</strong><span>Learning</span></div>
          </div>
        </div>

        <div className="planet-area">
          <div className="planet-nebula"></div>
          <div className="orbit orbit-1"></div><div className="orbit orbit-2"></div><div className="orbit orbit-3"></div>
          <div className="orbit-point point-1"></div><div className="orbit-point point-2"></div><div className="orbit-point point-3"></div>
          <div className="snowhub-planet">
            <div className="planet-inner">
              <div className="planet-snowflake">✦</div>
              <div className="planet-name">Snow<span>Hub</span></div>
              <div className="planet-signature"><span></span><em>By Siva</em><span></span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="practice-section">
        <div className="practice-container">
          <div className="practice-content">
            <div className="practice-label"><span></span> LEARN BY DOING</div>
            <h2>Theory is good.<br /><span>Practice is better.</span></h2>
            <p>Follow practical examples and understand how ServiceNow works in real projects.</p>
            <button className="practice-btn" onClick={() => setPage("courses")}>Explore Practical Learning <span>→</span></button>
          </div>

          <div className="code-editor">
            <div className="editor-header"><div className="editor-dots"><i></i><i></i><i></i></div></div>
            <pre>{`var gr = new GlideRecord("incident");

// Get active incidents
gr.addQuery("active", true);
gr.query();

while (gr.next()) {
    gs.info(gr.number);
}`}</pre>
          </div>
        </div>
      </section>
            {/* =====================================================
          PRACTICE & INTERVIEW HUB
      ====================================================== */}

      <section className="learning-tools-section">
        <div className="learning-tools-container">

          <div className="learning-tools-heading">
            <div className="section-label">LEARN BEYOND THEORY</div>

            <h2>
              Practice. <span>Prepare.</span>
            </h2>

            <p>
              Strengthen your ServiceNow knowledge with practice questions
              and interview preparation.
            </p>
          </div>

          <div className="learning-tools-grid">

            <article className="learning-tool-card">
              <div className="learning-tool-icon">🧠</div>

              <div>
                <h3>Practice ITSM</h3>

                <p>
                  Test your knowledge with practical ServiceNow
                  questions and improve your understanding.
                </p>

                <button
                  onClick={() => setPage("practice")}
                >
                  Start Practice →
                </button>
              </div>
            </article>

            <article className="learning-tool-card">
              <div className="learning-tool-icon">💼</div>

              <div>
                <h3>Interview Preparation</h3>

                <p>
                  Prepare for ServiceNow interviews with questions,
                  scenarios and practical concepts.
                </p>

                <button
                  onClick={() => setPage("interview")}
                >
                  Start Interview Prep →
                </button>
              </div>
            </article>

          </div>
        </div>
      </section>
            {/* =====================================================
          LEARNER REVIEWS
      ====================================================== */}

      <section className="reviews-section">
        <div className="reviews-container">

          <div className="reviews-heading">
            <div className="section-label">LEARNER FEEDBACK</div>

            <h2>
              What Learners <span>Say.</span>
            </h2>

            <p>
              Real feedback from people exploring ServiceNow with SnowHub By Siva.
            </p>
          </div>

          <div className="reviews-grid">

            <article className="review-card">
              <div className="review-stars">
                ★★★★★
              </div>

              <p>
                "The ITSM explanations are simple and easy to understand.
                The practical examples make the concepts much clearer."
              </p>

              <div className="review-author">
                <div className="review-avatar">S</div>

                <div>
                  <strong>Surya</strong>
                  <span>ServiceNow Learner</span>
                </div>
              </div>
            </article>


            <article className="review-card">
              <div className="review-stars">
                ★★★★★
              </div>

              <p>
                "I really liked the step-by-step approach. It makes learning
                ServiceNow much easier for beginners."
              </p>

              <div className="review-author">
                <div className="review-avatar">N</div>

                <div>
                  <strong>Nagendhra</strong>
                  <span>ServiceNow Learner</span>
                </div>
              </div>
            </article>


            <article className="review-card">
              <div className="review-stars">
                ★★★★★
              </div>

              <p>
                "The practice and interview sections are useful for preparing
                for ServiceNow interviews."
              </p>

              <div className="review-author">
                <div className="review-avatar">G</div>

                <div>
                  <strong>Gopi</strong>
                  <span>ServiceNow Learner</span>
                </div>
              </div>
            </article>

          </div>

        </div>
      </section>
      {/* =====================================================
    FEEDBACK SECTION
===================================================== */}

<section className="feedback-section">
  <div className="feedback-card">

    <div className="feedback-icon">
      💬
    </div>

    <div className="feedback-content">
      <div className="section-label">HELP US IMPROVE</div>

      <h2>
        Your Feedback <span>Matters.</span>
      </h2>

      <p>
        Found something useful? Have a suggestion or noticed something
        we can improve? Share your feedback and help us make SnowHub By Siva better.
      </p>
    </div>

    <button
      className="feedback-btn"
      onClick={() =>
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSesHo4j9PA_1--XbikXQg9sA9eHA5HgEEYPJqhdD3ws8EVTpg/viewform?usp=publish-editor", "_blank")
      }
    >
      Give Feedback →
    </button>

  </div>
</section>
    </>
  );
}

/* =========================================================
   COURSES
========================================================= */
/* =========================================================
   COURSES PAGE
========================================================= */

function CoursesPage({ setPage }) {
  return (
    <main className="courses-page">
      <section className="courses">

        <div className="section-label">
          SNOWHUB  BY SIVA LEARNING
        </div>

        <h1>
          Explore Our <span>Courses.</span>
        </h1>

        <p className="section-subtitle">
          Learn ServiceNow from fundamentals to advanced concepts
          through practical examples and real-world implementation.
        </p>


        <div className="course-grid">


          {/* =================================================
             TOPIC 01 — CLOUD FUNDAMENTALS
          ================================================= */}

          <article className="course-card">

            <div className="course-card-icon">
              ☁️
            </div>

            <div className="course-card-content">

              <div className="section-label">
                TOPIC 01
              </div>

              <h3>
                Cloud Fundamentals
              </h3>

              <p>
                Understand cloud computing, traditional infrastructure,
                cloud models, service models and how cloud concepts
                relate to ServiceNow.
              </p>

              <button
                onClick={() => setPage("cloud-fundamentals")}
              >
                Start Learning →
              </button>

            </div>

          </article>


          {/* =================================================
             TOPIC 02 — SERVICENOW FUNDAMENTALS
          ================================================= */}

          <article className="course-card">

            <div className="course-card-icon">
              ⚙️
            </div>

            <div className="course-card-content">

              <div className="section-label">
                TOPIC 02
              </div>

              <h3>
                ServiceNow Fundamentals
              </h3>

              <p>
                Learn the ServiceNow platform, instances, tables,
                records, forms, lists, users, roles and the basics
                of ServiceNow development.
              </p>

              <button
                onClick={() =>
                  alert("ServiceNow Fundamentals will be added next.")
                }
              >
                Start Learning →
              </button>

            </div>

          </article>


          {/* =================================================
             TOPIC 03 — ITSM
          ================================================= */}

          <article className="course-card">

            <div className="course-card-icon">
              🛠️
            </div>

            <div className="course-card-content">

              <div className="section-label">
                TOPIC 03
              </div>

              <h3>
                IT Service Management
              </h3>

              <p>
                Learn ServiceNow ITSM concepts including Incident,
                Problem, Change, Knowledge, Service Catalog, SLA,
                Business Rules and more.
              </p>

              <button
                onClick={() => setPage("itsm")}
              >
                Start Learning →
              </button>

            </div>

          </article>


          {/* =================================================
             TOPIC 04 — SCRIPTING
          ================================================= */}

          <article className="course-card">

            <div className="course-card-icon">
              💻
            </div>

            <div className="course-card-content">

              <div className="section-label">
                TOPIC 04
              </div>

              <h3>
                ServiceNow Scripting
              </h3>

              <p>
                Learn GlideRecord, Business Rules, Client Scripts,
                Script Includes, GlideAjax and practical
                ServiceNow scripting concepts.
              </p>

              <button
                onClick={() =>
                  alert("ServiceNow Scripting will be added next.")
                }
              >
                Coming Soon →
              </button>

            </div>

          </article>


          {/* =================================================
             TOPIC 05 — INTEGRATIONS
          ================================================= */}

          <article className="course-card">

            <div className="course-card-icon">
              🔗
            </div>

            <div className="course-card-content">

              <div className="section-label">
                TOPIC 05
              </div>

              <h3>
                ServiceNow Integrations
              </h3>

              <p>
                Understand REST APIs, IntegrationHub, MID Server,
                authentication and real-world ServiceNow
                integration scenarios.
              </p>

              <button
                onClick={() =>
                  alert("ServiceNow Integrations will be added next.")
                }
              >
                Coming Soon →
              </button>

            </div>

          </article>


          {/* =================================================
             TOPIC 06 — CMDB & DISCOVERY
          ================================================= */}

          <article className="course-card">

            <div className="course-card-icon">
              🗄️
            </div>

            <div className="course-card-content">

              <div className="section-label">
                TOPIC 06
              </div>

              <h3>
                CMDB & Discovery
              </h3>

              <p>
                Learn CMDB fundamentals, CIs, CSDM, Discovery,
                Identification and Reconciliation Engine and
                practical CMDB concepts.
              </p>

              <button
                onClick={() =>
                  alert("CMDB & Discovery will be added next.")
                }
              >
                Coming Soon →
              </button>

            </div>

          </article>

        </div>


        {/* =================================================
           BOTTOM
        ================================================= */}

        <div className="courses-bottom">

          <div>
            <strong>
              Free Learning
            </strong>

            <span>
              No login required for the initial version.
            </span>
          </div>


          <button
            className="back-home-btn"
            onClick={() => setPage("home")}
          >
            ← Back to Home
          </button>

        </div>

      </section>
    </main>
  );
}
/* =========================================================
   ITSM COURSE PAGE
========================================================= */

function ITSMPage({ setPage }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = itsmTopics.filter((topic) =>
  topic[1].toLowerCase().includes(searchTerm.toLowerCase())
);

  
  return (
    <main className="itsm-page">
      <section className="itsm-hero">
        <button className="course-back" onClick={() => setPage("courses")}>← Back to Courses</button>
        <div className="itsm-icon">⚙</div>
        <div className="section-label">SERVICENOW ITSM</div>
        <h1>IT Service Management<br /><span>Learn ITSM. Build Real Skills.</span></h1>
      
        <p>Learn ServiceNow ITSM concepts step by step through practical examples, implementation scenarios and interview-focused learning.</p>
        <div className="itsm-meta">
          <div><strong>12</strong><span>Topics</span></div>
          <div><strong>Beginner</strong><span>Level</span></div>
          <div><strong>Free</strong><span>Learning</span></div>
        </div>
      </section>

      <section className="itsm-learning">
        <div className="itsm-section-heading">
          <div className="section-label">COURSE CONTENT</div>
          <h2>What You'll <span>Learn.</span></h2>
          <p>Follow the topics in order and build your ServiceNow ITSM knowledge step by step.</p>
        </div>
<div className="course-search">
  <span className="course-search-icon">⌕</span>

  <input
    type="text"
    placeholder="Search ITSM topics..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  {searchTerm && (
    <button
      className="course-search-clear"
      onClick={() => setSearchTerm("")}
    >
      ×
    </button>
  )}
</div>
{filteredTopics.length === 0 && (
  <div className="no-search-results">
    <div className="no-search-icon">🔎</div>
    <h3>No topics found</h3>
    <p>
      Try searching for Incident, Change, SLA, Business Rules or another ITSM topic.
    </p>
  </div>
)}
        <div className="itsm-topic-grid">
          {filteredTopics.map(([number, title, description]) => {
            const practiceTopicMap = {
              "01": null,
              "02": "incident",
              "03": "problem",
              "04": "change",
              "05": "knowledge",
              "06": "catalog",
              "07": "users",
              "08": "sla",
              "09": "scripting",
              "10": "scripting",
              "11": "acl",
              "12": "reporting",
            };
            const practiceId = practiceTopicMap[number];

            return (
            <article className="itsm-topic-card" key={number}>
              <div className="topic-number">{number}</div>
              <div className="topic-content">
                <h3>{title}</h3>
                <p>{description}</p>
  
              <div className="topic-actions">
  <button onClick={() => setPage(`itsm-${number}`)}>
  Learn Topic →
</button>
</div>
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <section className="itsm-cta">
        <div>
          <div className="section-label">READY TO START?</div>
          <h2>Start your ITSM journey.</h2>
          <p>Learn the concepts, practice the examples and build your ServiceNow skills.</p>
        </div>
        <button className="start-btn" onClick={() => setPage("courses")}>Back to Courses →</button>
      </section>
    </main>
  );
}

/* =========================================================
   QUIZ
========================================================= */

function LessonQuiz({ question, options, answer }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="quiz">
      <div className="quiz-question">{question}</div>
      <div className="quiz-options">
        {options.map((option) => {
          let className = "quiz-option";
          if (selected) {
            if (option === answer) className += " correct";
            if (option === selected && option !== answer) className += " wrong";
          }
          return (
            <button key={option} className={className} onClick={() => setSelected(option)}>
              <span>{option}</span>
              <span>{selected && option === answer ? "✓" : "→"}</span>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className={selected === answer ? "quiz-result success" : "quiz-result error"}>
          {selected === answer ? `✓ Correct! ${answer} is the correct answer.` : `✕ Not quite. The correct answer is ${answer}.`}
        </div>
      )}

      {selected && <button className="quiz-retry" onClick={() => setSelected(null)}>Try Again</button>}
    </div>
  );
}

/* =========================================================
   LESSON SECTION
========================================================= */

function LessonSection({ section }) {
  return (
    <div className="lesson-block">
      <div className="lesson-label">{section.label}</div>
      <h2>{section.title}</h2>

      {section.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

      {section.cards && (
        <div className="concept-grid">
          {section.cards.map((card, index) => (
            <div className="concept-card" key={index}>
              <span>{card[0]}</span>
              <h3>{card[1]}</h3>
              <p>{card[2]}</p>
            </div>
          ))}
        </div>
      )}

      {section.flow && (
        <div className="scenario">
          <div className="scenario-title">Learning Flow</div>
          <div className="scenario-flow">
            {section.flow.map((item, index) => (
              <span key={index} style={{ display: "contents" }}>
                <div>{item}</div>
                {index < section.flow.length - 1 && (
                  <div className="lifecycle-arrow">→</div>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {section.rows && (
        <div className="record-example">
          <div className="record-header">{section.title}</div>
          {section.rows.map((row, index) => (
            <div className="record-row" key={index}>
              <span>{row[0]}</span>
              <strong>{row[1]}</strong>
            </div>
          ))}
        </div>
      )}

      {section.scenario && (
        <div className="scenario">
          <div className="scenario-title">💡 Practical Example</div>
          <p>{section.scenario}</p>
        </div>
      )}

      {section.code && (
        <div className="code-window">
          <div className="code-toolbar">
            <div className="code-dots"><span></span><span></span><span></span></div>
            <span>ServiceNow Script</span>
          </div>
          <pre>{section.code}</pre>
        </div>
      )}

      {section.explanation && (
        <div className="code-explanation">
          {section.explanation.map((item, index) => (
            <div key={index}><strong>{item[0]}</strong><span>{item[1]}</span></div>
          ))}
        </div>
      )}

      {section.challenge && (
  <PracticeChallenge
    title={section.challenge.title}
    scenario={section.challenge.scenario}
    question={section.challenge.question}
    options={section.challenge.options}
    correctAnswer={section.challenge.answer}
    explanation={section.challenge.explanation}
  />
)}

{section.quiz && (
  <LessonQuiz
    question={section.title}
    options={section.quiz}
    answer={section.answer}
  />
)}
    </div>
  );
}

function PracticeHub({ setPage }) {
  const practiceCategories = [
     [
    "incident",
    "🔴",
    "Incident Management",
    "Practice real-world incident scenarios.",
  ],
  [
    "problem",
    "🟣",
    "Problem Management",
    "Identify root causes and known errors.",
  ],
  [
    "change",
    "🔵",
    "Change Management",
    "Practice change assessment and approvals.",
  ],
  [
  "knowledge",
  "🟢",
  "Knowledge Management",
  "Practice knowledge article scenarios.",
],
[
  "catalog",
  "🟠",
  "Service Catalog",
  "Practice requests, RITMs and catalog tasks.",
],
[
  "sla",
  "🟡",
  "SLA & SLM",
  "Practice SLA and service-level scenarios.",
],

[
  "users",
  "⚙️",
  "Users, Groups & Roles",
  "Practice users, groups, roles and access.",
],

[
  "scripting",
  "💻",
  "Business Rules & Client Scripts",
  "Practice ServiceNow scripting scenarios.",
],

[
  "acl",
  "🔐",
  "Access Control",
  "Practice ACL and security scenarios.",
],

[
  "reporting",
  "📊",
  "Reporting & Dashboards",
  "Practice reporting and dashboard scenarios.",
],
    
  ];

  return (
    <main className="practice-page">

      <button
        className="lesson-back"
        onClick={() => setPage("itsm")}
      >
        ← Back to ITSM
      </button>

      <section className="practice-hero">

        <div className="practice-label">
          ITSM PRACTICE HUB
        </div>

        <h1>
          Practice What <span>You Learn.</span>
        </h1>

        <p>
          Test your ServiceNow ITSM knowledge with real-world scenarios,
          practical questions and interview-style challenges.
        </p>

      </section>

      <section className="practice-flow">

        <div>📚 Learn</div>
        <span>→</span>
        <div>🧠 Practice</div>
        <span>→</span>
        <div>🎯 Quiz</div>
        <span>→</span>
        <div>💼 Interview</div>

      </section>

      <section className="practice-section">

        <div className="section-heading">
          <span>Choose a Topic</span>
          <small>Practice by ITSM category</small>
        </div>

        <div className="practice-grid">

          {practiceCategories.map(
            ([id, icon, title, description]) => (

              <button
                key={id}
                className="practice-card"
                onClick={() => setPage(`practice-${id}`)}
              >

                <div className="practice-card-icon">
                  {icon}
                </div>

                <h3>{title}</h3>

                <p>{description}</p>

                <span>
                  Start Practice →
                </span>

              </button>

            )
          )}

        </div>

      </section>

    </main>
  );
}
const interviewQuestions = {
  incident: {
    title: "Incident Management",
    label: "INCIDENT MANAGEMENT INTERVIEW",
    questions: [
      {
        question: "What is an Incident in ServiceNow?",
        answer:
          "An Incident is an unplanned interruption to an IT service or a reduction in the quality of an IT service.",
        example:
          "For example, if a user cannot connect to VPN, the Service Desk can create an Incident to restore the service.",
      },
      {
        question: "What is the main goal of Incident Management?",
        answer:
          "The main goal is to restore normal service operation as quickly as possible and minimize the impact on business operations.",
        example:
          "If email service is unavailable, the support team focuses on restoring email service rather than investigating the long-term root cause first.",
      },
      {
        question: "What is the difference between an Incident and a Problem?",
        answer:
          "Incident Management focuses on restoring service. Problem Management focuses on identifying and managing the underlying cause of one or more incidents.",
        example:
          "A VPN outage is handled as an Incident. If the VPN keeps failing repeatedly, the underlying cause can be investigated through Problem Management.",
      },
      {
        question: "What is an Assignment Group?",
        answer:
          "An Assignment Group identifies the team responsible for working on a record such as an Incident.",
        example:
          "A network-related Incident can be assigned to the Network Support group.",
      },
      {
        question: "What is Incident Priority?",
        answer:
          "Priority indicates how quickly an Incident needs to be addressed. It is commonly determined using factors such as impact and urgency.",
        example:
          "An issue affecting many critical users may receive a higher priority than an issue affecting a single user.",
      },
      {
        question: "What is the Incident lifecycle?",
        answer:
          "An Incident typically moves through states such as New, In Progress, On Hold, Resolved and Closed, depending on the organization's configuration.",
        example:
          "A newly reported issue starts as New, is investigated in In Progress, and moves to Resolved after the service is restored.",
      },
      {
        question: "What is Incident Assignment?",
        answer:
          "Incident Assignment is the process of assigning an Incident to the appropriate support group or agent for investigation and resolution.",
        example:
          "A database issue can be assigned to the Database Support group.",
      },
      {
        question: "What is an Incident SLA?",
        answer:
          "An Incident SLA defines a target for activities such as responding to or resolving an Incident within an agreed time.",
        example:
          "A Priority 1 Incident may have a shorter response and resolution target than a low-priority Incident.",
      },
      {
        question: "What happens when an Incident is resolved?",
        answer:
          "The Incident contains the resolution information and moves into the configured resolution or closure process.",
        example:
          "After restoring a user's VPN access, the agent records the resolution details and resolves the Incident.",
      },
      {
        question: "When should an Incident be escalated?",
        answer:
          "An Incident can be escalated when additional technical expertise, authority or faster attention is required.",
        example:
          "If the Service Desk cannot resolve a database connectivity issue, it can escalate or assign the Incident to the Database Support team.",
      },
    ],
  },
    problem: {
    title: "Problem Management",
    label: "PROBLEM MANAGEMENT INTERVIEW",
    questions: [
      {
        question: "What is Problem Management?",
        answer:
          "Problem Management focuses on identifying and managing the underlying causes of incidents and preventing recurrence.",
        example:
          "If the same application crashes repeatedly, Problem Management investigates why the failures keep occurring.",
      },
      {
        question: "What is the difference between an Incident and a Problem?",
        answer:
          "An Incident focuses on restoring service, while a Problem focuses on identifying and managing the underlying cause.",
        example:
          "Restoring a failed VPN connection is incident work; investigating why VPN failures keep recurring is problem work.",
      },
      {
        question: "What is Root Cause Analysis?",
        answer:
          "Root Cause Analysis is the process of investigating an issue to identify the underlying reason for a problem.",
        example:
          "If a database repeatedly becomes unavailable, the team investigates the technical cause rather than resolving each outage independently.",
      },
      {
        question: "What is a Known Error?",
        answer:
          "A Known Error is a problem for which the underlying cause is known, but a permanent solution may not yet be available.",
        example:
          "A recurring application issue has a documented root cause and workaround while the permanent fix is being developed.",
      },
      {
        question: "What is a workaround?",
        answer:
          "A workaround is a temporary method used to reduce or eliminate the impact of an issue without permanently fixing its underlying cause.",
        example:
          "Restarting a service temporarily restores functionality while the team investigates the actual cause.",
      },
      {
        question: "Why is Problem Management important?",
        answer:
          "It helps reduce recurring incidents by identifying and addressing their underlying causes.",
        example:
          "Instead of repeatedly resolving the same server failure, the team identifies the infrastructure issue causing it.",
      },
      {
        question: "Can multiple incidents be related to one problem?",
        answer:
          "Yes. Multiple incidents can be related to the same underlying problem.",
        example:
          "Ten users reporting the same application failure may all be related to one underlying problem.",
      },
      {
        question: "What is a Problem record used for?",
        answer:
          "It provides a structured place to investigate, document, manage and resolve an underlying cause.",
        example:
          "The Problem record can contain investigation details, root cause information, workarounds and resolution details.",
      },
      {
        question: "When can a Problem be resolved?",
        answer:
          "A Problem can be resolved when its underlying cause has been addressed according to the organization's process.",
        example:
          "After implementing and validating a permanent fix for a recurring database issue, the Problem can move toward resolution.",
      },
      {
        question: "How does Problem Management help Incident Management?",
        answer:
          "By addressing recurring underlying causes, Problem Management can help reduce the number and impact of future incidents.",
        example:
          "Fixing the root cause of repeated network failures prevents the Service Desk from receiving the same incident repeatedly.",
      },
    ],
  },

  change: {
    title: "Change Management",
    label: "CHANGE MANAGEMENT INTERVIEW",
    questions: [
      {
        question: "What is Change Management?",
        answer:
          "Change Management manages changes to IT services and infrastructure in a controlled manner while considering risk and impact.",
        example:
          "Installing a production database patch can be managed through a Change record.",
      },
      {
        question: "What are common types of changes?",
        answer:
          "Common ServiceNow change types include Standard, Normal and Emergency changes.",
        example:
          "A repeatable low-risk activity may be handled as a Standard Change, while an urgent critical fix may require an Emergency Change.",
      },
      {
        question: "What is a Standard Change?",
        answer:
          "A Standard Change is typically a pre-authorized, low-risk and repeatable change that follows an established procedure.",
        example:
          "A routinely performed, documented software installation may qualify as a Standard Change.",
      },
      {
        question: "What is a Normal Change?",
        answer:
          "A Normal Change follows the organization's assessment, planning, approval and implementation process.",
        example:
          "A planned production server upgrade may require impact assessment and approval before implementation.",
      },
      {
        question: "What is an Emergency Change?",
        answer:
          "An Emergency Change is used when urgent action is required to address a critical situation.",
        example:
          "A critical security vulnerability requiring immediate remediation may require an Emergency Change.",
      },
      {
        question: "What is a Change Advisory Board?",
        answer:
          "A Change Advisory Board, or CAB, is a group involved in evaluating and advising on changes according to organizational processes.",
        example:
          "A high-impact production change may be reviewed by the CAB before implementation.",
      },
      {
        question: "What information is commonly documented in a Change?",
        answer:
          "Change records can include the reason, risk, impact, implementation plan, test plan, backout plan and scheduling information.",
        example:
          "A production upgrade can document implementation steps and a rollback plan before approval.",
      },
      {
        question: "Why is a backout plan important?",
        answer:
          "A backout plan defines how to return the environment to its previous state if the change does not produce the expected result.",
        example:
          "If a deployment causes an application failure, the documented rollback steps can be followed.",
      },
      {
        question: "What is the relationship between Change and Incident Management?",
        answer:
          "A change can be used to implement a planned modification, while an incident focuses on restoring an affected service.",
        example:
          "A failed production deployment may cause an incident, while the deployment itself was managed through a change.",
      },
      {
        question: "What happens after a change is implemented?",
        answer:
          "The result can be reviewed and the change can move through the organization's completion and closure process.",
        example:
          "After a successful server upgrade, the team validates the result and records the implementation outcome.",
      },
    ],
  },

  knowledge: {
    title: "Knowledge Management",
    label: "KNOWLEDGE MANAGEMENT INTERVIEW",
    questions: [
      {
        question: "What is Knowledge Management?",
        answer:
          "Knowledge Management organizes useful information so that users and support teams can find and reuse it.",
        example:
          "A password-reset article can help users and Service Desk agents follow the same documented procedure.",
      },
      {
        question: "What is a Knowledge Article?",
        answer:
          "A Knowledge Article contains information, instructions or solutions that can be made available to an intended audience.",
        example:
          "An article can explain how to connect to the corporate VPN.",
      },
      {
        question: "What is the benefit of Knowledge Management?",
        answer:
          "It helps improve information reuse, support consistency and self-service.",
        example:
          "Users can search for a solution before contacting the Service Desk.",
      },
      {
        question: "What is knowledge article lifecycle?",
        answer:
          "Organizations can configure stages such as drafting, review, approval, publication and retirement.",
        example:
          "A new troubleshooting article may be drafted, reviewed and approved before publication.",
      },
      {
        question: "Why should knowledge articles be reviewed?",
        answer:
          "Review helps ensure that published information remains useful and aligned with organizational requirements.",
        example:
          "An outdated VPN procedure can be reviewed and updated after the VPN platform changes.",
      },
      {
        question: "What is knowledge article versioning?",
        answer:
          "Versioning allows organizations to manage different revisions of knowledge content according to their configured process.",
        example:
          "A new version can update screenshots and instructions after a system upgrade.",
      },
      {
        question: "How does Knowledge Management support self-service?",
        answer:
          "Users can search published knowledge content and find information without always needing direct assistance from support agents.",
        example:
          "A user can search for 'How to reset my password' and follow the published instructions.",
      },
      {
        question: "What is knowledge feedback used for?",
        answer:
          "Feedback can help identify whether knowledge content is useful and where improvements may be needed.",
        example:
          "If users repeatedly report that an article is unclear, the content can be reviewed.",
      },
      {
        question: "When should a knowledge article be retired?",
        answer:
          "An article can be retired when it is obsolete, no longer applicable or otherwise should not remain available according to the organization's process.",
        example:
          "An article describing a retired application can be removed from active use.",
      },
      {
        question: "How can Knowledge Management reduce support workload?",
        answer:
          "Reusable solutions can help users resolve common issues themselves and help agents resolve incidents more consistently.",
        example:
          "A well-written printer troubleshooting article can reduce repetitive Service Desk interactions.",
      },
    ],
  },

  catalog: {
    title: "Service Catalog",
    label: "SERVICE CATALOG INTERVIEW",
    questions: [
      {
        question: "What is the Service Catalog?",
        answer:
          "The Service Catalog provides a structured way for users to request services and items offered by an organization.",
        example:
          "An employee can use the catalog to request a laptop or software.",
      },
      {
        question: "What is a Catalog Item?",
        answer:
          "A Catalog Item is a requestable service or item presented through the Service Catalog.",
        example:
          "Request a New Laptop can be configured as a Catalog Item.",
      },
      {
        question: "What is an RITM?",
        answer:
          "RITM stands for Requested Item and represents a specific catalog item requested as part of a request.",
        example:
          "If a user requests a laptop, the laptop request can be represented by an RITM.",
      },
      {
        question: "What is a REQ?",
        answer:
          "REQ represents the overall request submitted by a user and can contain one or more requested items.",
        example:
          "A user can submit one request containing a laptop and software, with separate requested items.",
      },
      {
        question: "What is a Catalog Task?",
        answer:
          "A Catalog Task is used to perform fulfillment work associated with a requested catalog item.",
        example:
          "The Hardware team can receive a Catalog Task to prepare and deliver a laptop.",
      },
      {
        question: "What are Catalog Variables?",
        answer:
          "Variables collect information from the requester when a catalog item is submitted.",
        example:
          "A laptop request can ask the user to select memory, operating system and laptop type.",
      },
      {
        question: "What is an Order Guide?",
        answer:
          "An Order Guide can guide users through requesting multiple related catalog items from a single guided experience.",
        example:
          "A new employee Order Guide could include laptop, software and access requests.",
      },
      {
        question: "What is a Record Producer?",
        answer:
          "A Record Producer provides a catalog-based interface for creating a record in a target table.",
        example:
          "A Record Producer can provide a simplified form for creating an Incident.",
      },
      {
        question: "What is the difference between a Catalog Item and a Record Producer?",
        answer:
          "A Catalog Item generally creates a requestable item and related request records, while a Record Producer is designed to create a record in a target table.",
        example:
          "A laptop request can use a Catalog Item, while a simple form for submitting an Incident can use a Record Producer.",
      },
      {
        question: "What is catalog fulfillment?",
        answer:
          "Catalog fulfillment is the process of performing the work required to complete a requested catalog item.",
        example:
          "After a laptop request is approved, fulfillment tasks can be assigned to the appropriate teams.",
      },
    ],
  },

  sla: {
    title: "SLA & SLM",
    label: "SLA & SLM INTERVIEW",
    questions: [
      {
        question: "What is an SLA?",
        answer:
          "A Service Level Agreement defines an agreed service target or commitment that can be tracked for a task.",
        example:
          "A Priority 1 incident can have a defined response and resolution target.",
      },
      {
        question: "What is SLM?",
        answer:
          "Service Level Management involves defining, monitoring and managing service levels and related commitments.",
        example:
          "A service team can monitor whether incidents are being resolved within agreed targets.",
      },
      {
        question: "What is an SLA Definition?",
        answer:
          "An SLA Definition specifies conditions and timing rules used to create and manage SLA commitments.",
        example:
          "An SLA definition can apply to incidents with a particular priority.",
      },
      {
        question: "What is an SLA breach?",
        answer:
          "A breach occurs when the defined SLA target is exceeded according to the configured SLA conditions.",
        example:
          "If an incident's resolution target expires before it is resolved, its SLA can breach.",
      },
      {
        question: "What does an SLA pause condition do?",
        answer:
          "A pause condition can temporarily stop SLA time accumulation while the configured condition is true.",
        example:
          "An SLA may pause while waiting for customer information if the SLA definition is configured that way.",
      },
      {
        question: "What is an SLA start condition?",
        answer:
          "A start condition determines when the SLA should begin tracking a task.",
        example:
          "An SLA can start when an incident meets the conditions defined for that SLA.",
      },
      {
        question: "What is an SLA stop condition?",
        answer:
          "A stop condition determines when the SLA tracking should stop.",
        example:
          "A resolution SLA can stop when the incident reaches the configured resolved state.",
      },
      {
        question: "What is the difference between response and resolution SLA?",
        answer:
          "A response SLA measures a response target, while a resolution SLA measures a target for resolving the task.",
        example:
          "An incident may need an initial response within 30 minutes and resolution within four hours.",
      },
      {
        question: "Why are SLAs important?",
        answer:
          "SLAs provide measurable targets that help organizations monitor service performance.",
        example:
          "A support manager can monitor whether high-priority incidents meet their resolution targets.",
      },
      {
        question: "What is SLA reporting?",
        answer:
          "SLA reporting provides visibility into SLA performance such as met targets, breached targets and timing information.",
        example:
          "A manager can analyze how many Priority 1 incidents breached their resolution targets.",
      },
    ],
  },

  users: {
    title: "Users, Groups & Roles",
    label: "USERS, GROUPS & ROLES INTERVIEW",
    questions: [
      {
        question: "What is a User in ServiceNow?",
        answer:
          "A User record represents an individual who can interact with the ServiceNow instance.",
        example:
          "An employee can have a user record containing their name, email and other configured information.",
      },
      {
        question: "What is a Group?",
        answer:
          "A Group organizes users who share a responsibility, function or work assignment.",
        example:
          "Network Support can be configured as a group containing network support agents.",
      },
      {
        question: "What is a Role?",
        answer:
          "A Role provides permissions that control access to functionality or data according to the configured security model.",
        example:
          "An appropriate role can provide an agent access to required Service Desk functionality.",
      },
      {
        question: "What is an Assignment Group?",
        answer:
          "An Assignment Group identifies the team responsible for working on a task or record.",
        example:
          "A network incident can be assigned to the Network Support group.",
      },
      {
        question: "Can a user belong to multiple groups?",
        answer:
          "Yes. A user can be a member of multiple groups when required by the organization's configuration.",
        example:
          "An agent can belong to both Service Desk and a specialized application support group.",
      },
      {
        question: "Can a user have multiple roles?",
        answer:
          "Yes. Users can have multiple roles when their responsibilities require different permissions.",
        example:
          "An administrator may require several roles to perform different administrative functions.",
      },
      {
        question: "Why are groups useful?",
        answer:
          "Groups help organize users and route work to teams responsible for particular services or functions.",
        example:
          "Incidents can be assigned to the correct support group rather than directly to an arbitrary user.",
      },
      {
        question: "What is the relationship between a user and a group?",
        answer:
          "Users can be members of groups, allowing work and responsibilities to be organized by team.",
        example:
          "A Service Desk agent can be a member of the Service Desk group.",
      },
      {
        question: "Why should roles be assigned carefully?",
        answer:
          "Roles provide access, so they should align with the user's responsibilities and the organization's security requirements.",
        example:
          "A user should receive only the access needed for their job according to the configured security model.",
      },
      {
        question: "How do groups help Incident Management?",
        answer:
          "Groups identify teams responsible for handling incidents and help route work to the appropriate support organization.",
        example:
          "A database incident can be assigned to the Database Support group.",
      },
    ],
  },

  scripting: {
    title: "Business Rules & Client Scripts",
    label: "SCRIPTING INTERVIEW",
    questions: [
      {
        question: "What is a Business Rule?",
        answer:
          "A Business Rule is server-side logic that can execute when specified database operations or conditions occur.",
        example:
          "A Business Rule can set or validate values when a record is inserted or updated.",
      },
      {
        question: "What are common Business Rule timings?",
        answer:
          "Common timings include before, after, async and display, depending on the requirement.",
        example:
          "A before Business Rule can modify field values before a record is saved.",
      },
      {
        question: "What is a Client Script?",
        answer:
          "A Client Script provides client-side logic that runs in the user's browser for supported form interactions.",
        example:
          "A Client Script can make a field mandatory when another field changes.",
      },
      {
        question: "What are common Client Script types?",
        answer:
          "Common types include onLoad, onChange, onSubmit and onCellEdit.",
        example:
          "An onChange script can react when a user changes the Priority field.",
      },
      {
        question: "What is GlideRecord?",
        answer:
          "GlideRecord is a server-side API commonly used to query and manipulate ServiceNow records.",
        example:
          "A Business Rule can use GlideRecord to query related records.",
      },
      {
        question: "What is GlideAjax?",
        answer:
          "GlideAjax provides a way for client-side code to make asynchronous calls to server-side logic through an appropriate Script Include.",
        example:
          "A Client Script can request server-side information without directly querying the database from the browser.",
      },
      {
        question: "What is a Script Include?",
        answer:
          "A Script Include stores reusable server-side JavaScript logic that can be called from appropriate server-side or client-server mechanisms.",
        example:
          "A reusable utility function can be placed in a Script Include.",
      },
      {
        question: "Should database queries be performed unnecessarily from Client Scripts?",
        answer:
          "No. Unnecessary server calls can affect user experience and performance. Appropriate server-side mechanisms should be used when server data is required.",
        example:
          "Instead of making repeated calls for the same information, a developer can design a more efficient server interaction.",
      },
      {
        question: "What is the difference between client-side and server-side scripting?",
        answer:
          "Client-side scripting runs in the user's browser, while server-side scripting executes on the ServiceNow server.",
        example:
          "An onChange Client Script handles form behavior in the browser, while a Business Rule runs on the server.",
      },
      {
        question: "Why should ServiceNow scripts be kept efficient?",
        answer:
          "Efficient scripts help maintain application performance, scalability and maintainability.",
        example:
          "Avoiding unnecessary database queries in frequently executed Business Rules can reduce system overhead.",
      },
    ],
  },

  acl: {
    title: "Access Control",
    label: "ACCESS CONTROL INTERVIEW",
    questions: [
      {
        question: "What is an ACL?",
        answer:
          "An Access Control Rule determines whether a user can perform an operation on a record or field according to configured security requirements.",
        example:
          "An ACL can restrict access to a sensitive field to users with the required role.",
      },
      {
        question: "What operations can ACLs control?",
        answer:
          "Common operations include create, read, write and delete.",
        example:
          "A read ACL can control whether a user can view protected data.",
      },
      {
        question: "What is a table-level ACL?",
        answer:
          "A table-level ACL controls access to records in a table for a specified operation.",
        example:
          "A table ACL can restrict who can read Incident records.",
      },
      {
        question: "What is a field-level ACL?",
        answer:
          "A field-level ACL controls access to a particular field.",
        example:
          "A sensitive field can have a read ACL that restricts visibility.",
      },
      {
        question: "Can ACLs use roles?",
        answer:
          "Yes. ACL configurations can use roles as part of their access requirements.",
        example:
          "Only users with an appropriate security role may be allowed to read a protected field.",
      },
      {
        question: "Can ACLs use conditions?",
        answer:
          "Yes. ACLs can include configured conditions that help determine whether access is allowed.",
        example:
          "Access may depend on properties of the current record.",
      },
      {
        question: "What is the purpose of ACL security?",
        answer:
          "ACLs help protect ServiceNow data and functionality by controlling who can access or modify it.",
        example:
          "Confidential employee information can be protected from unauthorized users.",
      },
      {
        question: "What should you check when an ACL denies access?",
        answer:
          "Review the applicable ACL, operation, roles, conditions and scripted requirements according to the configured security model.",
        example:
          "If a user cannot read a field, an administrator can inspect the applicable read ACL and its requirements.",
      },
      {
        question: "What is the difference between Read and Write ACLs?",
        answer:
          "Read controls whether data can be viewed, while Write controls whether existing data can be modified.",
        example:
          "A user may be allowed to read a record but not change it.",
      },
      {
        question: "Why is ACL configuration important?",
        answer:
          "Incorrect security configuration can expose information or prevent legitimate users from performing their work.",
        example:
          "Sensitive business data should only be accessible to users authorized by the organization's security design.",
      },
    ],
  },

  reporting: {
    title: "Reporting & Dashboards",
    label: "REPORTING & DASHBOARDS INTERVIEW",
    questions: [
      {
        question: "What is a Report in ServiceNow?",
        answer:
          "A Report provides a visual or tabular representation of ServiceNow data based on configured criteria.",
        example:
          "A manager can create a report showing open incidents by priority.",
      },
      {
        question: "What is a Dashboard?",
        answer:
          "A Dashboard provides a consolidated view of reports and other configured visual components.",
        example:
          "A Service Desk dashboard can display incident volume, priority distribution and SLA information.",
      },
      {
        question: "What is a report filter?",
        answer:
          "A filter defines which records should be included in a report.",
        example:
          "A report can be filtered to show only active incidents.",
      },
      {
        question: "What is Group By in reporting?",
        answer:
          "Group By organizes report data according to values of a selected field.",
        example:
          "Incidents can be grouped by Assignment Group.",
      },
      {
        question: "What is an aggregation?",
        answer:
          "An aggregation summarizes data using functions such as count or other supported calculations.",
        example:
          "A report can count the number of incidents for each assignment group.",
      },
      {
        question: "Why are dashboards useful?",
        answer:
          "Dashboards provide a consolidated view that can help users monitor important operational information.",
        example:
          "A manager can monitor open incidents and SLA performance from one dashboard.",
      },
      {
        question: "Can reports be added to dashboards?",
        answer:
          "Yes. Reports can be displayed as dashboard components according to the configured dashboard experience.",
        example:
          "An incident trend report can be placed on a Service Desk dashboard.",
      },
      {
        question: "What is a report visualization?",
        answer:
          "A visualization represents report data in a graphical or tabular form.",
        example:
          "Incident data can be displayed using a bar, pie or other supported visualization.",
      },
      {
        question: "How can reporting help ITSM teams?",
        answer:
          "Reporting provides visibility into operational data and can help teams monitor workload and service performance.",
        example:
          "A Service Desk can monitor incident volumes by priority and assignment group.",
      },
      {
        question: "What should you consider when building a report?",
        answer:
          "Consider the purpose, data source, filters, grouping, visualization and audience.",
        example:
          "A management report should contain only the data and visualization needed to answer the business question.",
      },
    ],
  },
};
const practiceQuestions = {
  incident: {
    title: "Incident Management",
    label: "INCIDENT MANAGEMENT",
    questions: [
      {
        scenario:
          "A user reports that they cannot connect to the company VPN. Other users are able to connect successfully.",
        question:
          "What should the Service Desk create first?",
        options: [
          "Problem",
          "Change",
          "Incident",
          "Knowledge Article",
        ],
        answer: "Incident",
        explanation:
          "An incident is used when there is an unplanned interruption or reduction in the quality of an IT service.",
      },
      {
        scenario:
          "A user reports that their laptop is running very slowly and they need help immediately.",
        question:
          "Which ITSM process should handle this issue initially?",
        options: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
        ],
        answer: "Incident Management",
        explanation:
          "The user's service is currently affected, so the issue should initially be handled as an incident.",
      },
      {
        scenario:
          "The same application crashes repeatedly for many users every week.",
        question:
          "What should the IT team investigate?",
        options: [
          "Incident only",
          "Underlying problem",
          "Service Catalog item",
          "User role",
        ],
        answer: "Underlying problem",
        explanation:
          "Repeated incidents may indicate an underlying problem that requires root cause analysis.",
      },
      {
        scenario:
          "An incident has been resolved and the user's service is working again.",
        question:
          "What should happen next?",
        options: [
          "Delete the incident",
          "Close the incident after required validation",
          "Create a new change",
          "Create a new user",
        ],
        answer: "Close the incident after required validation",
        explanation:
          "After resolution and required validation, the incident can move through the closure process.",
      },
      {
        scenario:
          "A Service Desk agent receives an incident but cannot resolve it.",
        question:
          "What can the agent do?",
        options: [
          "Ignore the incident",
          "Escalate or assign it to the appropriate support group",
          "Delete it",
          "Convert every incident into a change",
        ],
        answer:
          "Escalate or assign it to the appropriate support group",
        explanation:
          "Incidents can be assigned or escalated to the appropriate support team when additional expertise is required.",
      },
    ],
  },

  problem: {
    title: "Problem Management",
    label: "PROBLEM MANAGEMENT",
    questions: [
      {
        scenario:
          "The same application fails repeatedly for several users.",
        question:
          "What should Problem Management investigate?",
        options: [
          "The underlying cause",
          "A new user account",
          "A catalog item",
          "A dashboard",
        ],
        answer: "The underlying cause",
        explanation:
          "Problem Management focuses on identifying and managing the underlying causes of incidents.",
      },
      {
        scenario:
          "A root cause has been identified but a permanent fix is not yet available.",
        question:
          "What can be documented?",
        options: [
          "Known Error",
          "Service Catalog",
          "Client Script",
          "SLA",
        ],
        answer: "Known Error",
        explanation:
          "A known error records a problem for which the root cause is understood, even if a permanent resolution is not yet implemented.",
      },
      {
        scenario:
          "A problem investigation is being performed.",
        question:
          "What is a key activity?",
        options: [
          "Root Cause Analysis",
          "Creating random users",
          "Changing every incident",
          "Deleting incidents",
        ],
        answer: "Root Cause Analysis",
        explanation:
          "Root Cause Analysis helps identify why recurring incidents are happening.",
      },
      {
        scenario:
          "A permanent solution has been implemented for a known problem.",
        question:
          "What should happen to the problem?",
        options: [
          "It can be resolved and eventually closed",
          "Create another problem",
          "Delete all incidents",
          "Create a new user",
        ],
        answer: "It can be resolved and eventually closed",
        explanation:
          "Once the underlying issue has been permanently addressed, the problem can move toward resolution and closure.",
      },
      {
        scenario:
          "Several incidents have the same underlying cause.",
        question:
          "Why is Problem Management useful?",
        options: [
          "To identify and address recurring causes",
          "To create employee accounts",
          "To build dashboards only",
          "To manage passwords only",
        ],
        answer: "To identify and address recurring causes",
        explanation:
          "Problem Management helps organizations reduce recurring incidents by addressing their underlying causes.",
      },
    ],
  },

  change: {
    title: "Change Management",
    label: "CHANGE MANAGEMENT",
    questions: [
      {
        scenario:
          "The IT team needs to install a planned patch on a production server.",
        question:
          "What should be created?",
        options: [
          "Incident",
          "Change Request",
          "Knowledge Article",
          "User",
        ],
        answer: "Change Request",
        explanation:
          "A planned modification to a production environment should be managed through the change process.",
      },
      {
        scenario:
          "A change is low risk, well understood and frequently performed.",
        question:
          "Which type of change may apply?",
        options: [
          "Standard Change",
          "Emergency Change",
          "Incident",
          "Problem",
        ],
        answer: "Standard Change",
        explanation:
          "Standard changes are typically pre-authorized, low-risk and repeatable.",
      },
      {
        scenario:
          "A critical production outage requires an immediate technical change.",
        question:
          "Which change type may be appropriate?",
        options: [
          "Emergency Change",
          "Standard Change",
          "Knowledge Article",
          "Catalog Request",
        ],
        answer: "Emergency Change",
        explanation:
          "Emergency changes are used when urgent action is required to address a critical situation.",
      },
      {
        scenario:
          "A normal production change requires review before implementation.",
        question:
          "What is an important part of the process?",
        options: [
          "Assessment and approval",
          "Deleting the request",
          "Creating a random user",
          "Skipping all documentation",
        ],
        answer: "Assessment and approval",
        explanation:
          "Changes are assessed for risk and impact and follow the appropriate approval process.",
      },
      {
        scenario:
          "A planned change has been implemented successfully.",
        question:
          "What should happen afterward?",
        options: [
          "Review the result and close the change appropriately",
          "Delete the change",
          "Create another incident",
          "Remove all approvals",
        ],
        answer:
          "Review the result and close the change appropriately",
        explanation:
          "After implementation, the change outcome should be reviewed and the record completed appropriately.",
      },
    ],
  },
    knowledge: {
    title: "Knowledge Management",
    label: "KNOWLEDGE MANAGEMENT",
    questions: [
      {
        scenario:
          "A Service Desk team wants to document the steps for resetting a user's password.",
        question:
          "What should they create?",
        options: [
          "Knowledge Article",
          "Incident",
          "Change Request",
          "Problem",
        ],
        answer: "Knowledge Article",
        explanation:
          "A knowledge article can document reusable instructions and solutions for users and support teams.",
      },

      {
        scenario:
          "A knowledge article has been reviewed and approved.",
        question:
          "What should happen before users can access it?",
        options: [
          "Publish the article",
          "Delete the article",
          "Create an incident",
          "Create a new role",
        ],
        answer: "Publish the article",
        explanation:
          "After the appropriate review and approval process, a knowledge article can be published for its intended audience.",
      },

      {
        scenario:
          "A support agent finds a knowledge article that solves a user's issue.",
        question:
          "What is a key benefit of the article?",
        options: [
          "It provides reusable information",
          "It automatically creates every change",
          "It replaces all incidents",
          "It deletes user records",
        ],
        answer: "It provides reusable information",
        explanation:
          "Knowledge articles allow useful solutions and information to be reused by support teams and users.",
      },

      {
        scenario:
          "A knowledge article contains outdated troubleshooting instructions.",
        question:
          "What should the knowledge team do?",
        options: [
          "Review and update the article",
          "Ignore it permanently",
          "Create a random incident",
          "Delete all knowledge articles",
        ],
        answer: "Review and update the article",
        explanation:
          "Knowledge content should be maintained so that users and support teams receive useful and current information.",
      },

      {
        scenario:
          "A user searches the knowledge base before contacting the Service Desk.",
        question:
          "What can this help achieve?",
        options: [
          "Self-service",
          "Automatic server replacement",
          "Automatic user deletion",
          "Change approval",
        ],
        answer: "Self-service",
        explanation:
          "A well-maintained knowledge base can help users find answers themselves through self-service.",
      },
    ],
  },
    catalog: {
    title: "Service Catalog",
    label: "SERVICE CATALOG",
    questions: [
      {
        scenario:
          "An employee submits a request for a new company laptop through the Service Catalog.",
        question:
          "What is created to represent the overall request?",
        options: [
          "REQ",
          "Incident",
          "Problem",
          "Change",
        ],
        answer: "REQ",
        explanation:
          "A Requested Item (RITM) represents a specific catalog item requested by a user, while the REQ represents the overall request.",
      },

      {
        scenario:
          "A user orders a laptop and a software package in the same catalog request.",
        question:
          "What can represent each requested catalog item?",
        options: [
          "RITM",
          "Only an Incident",
          "Only a Problem",
          "Only an SLA",
        ],
        answer: "RITM",
        explanation:
          "Each requested catalog item is represented by a Requested Item (RITM). A single request can contain multiple RITMs.",
      },

      {
        scenario:
          "The laptop RITM requires the Hardware team to perform the actual fulfillment work.",
        question:
          "What record can be assigned to the fulfillment team?",
        options: [
          "Catalog Task",
          "Knowledge Article",
          "Problem",
          "Change Request",
        ],
        answer: "Catalog Task",
        explanation:
          "Catalog Tasks are used to perform the fulfillment activities required for a requested item.",
      },

      {
        scenario:
          "A catalog item asks the user to select laptop type, operating system and memory.",
        question:
          "What is commonly used to collect these values?",
        options: [
          "Variables",
          "Incidents",
          "Problems",
          "SLAs",
        ],
        answer: "Variables",
        explanation:
          "Catalog variables collect information from the requester when they submit a catalog item.",
      },

      {
        scenario:
          "A company wants users to request multiple related services through one guided submission.",
        question:
          "Which Service Catalog feature can help?",
        options: [
          "Order Guide",
          "Incident",
          "Problem",
          "Knowledge Article",
        ],
        answer: "Order Guide",
        explanation:
          "An Order Guide can guide users through requesting multiple related catalog items as part of one overall request.",
      },
    ],
  },
    sla: {
    title: "SLA & SLM",
    label: "SLA & SLM",
    questions: [
      {
        scenario:
          "A Priority 1 incident has a response target of 30 minutes.",
        question:
          "What does the response SLA measure?",
        options: [
          "Time until the incident is responded to",
          "Time until the server is replaced",
          "Number of users in the group",
          "Number of knowledge articles",
        ],
        answer: "Time until the incident is responded to",
        explanation:
          "A response SLA measures the time allowed to respond to the task according to the defined SLA conditions.",
      },
      {
        scenario:
          "An incident reaches its defined resolution target without being resolved.",
        question:
          "What may happen?",
        options: [
          "The SLA can breach",
          "The incident is automatically deleted",
          "A new user is created",
          "The catalog item is published",
        ],
        answer: "The SLA can breach",
        explanation:
          "When the defined SLA target is exceeded, the SLA can enter a breached state.",
      },
      {
        scenario:
          "A ticket is waiting for information from the customer and the SLA configuration allows this period to be excluded.",
        question:
          "What can happen to the SLA timer?",
        options: [
          "It can pause",
          "It must always continue",
          "The ticket is deleted",
          "The SLA is permanently removed",
        ],
        answer: "It can pause",
        explanation:
          "Depending on the SLA definition, the timer can pause when specified conditions are met.",
      },
      {
        scenario:
          "A company wants to track whether incidents are resolved within agreed service targets.",
        question:
          "Which concept is relevant?",
        options: [
          "Service Level Management",
          "User Administration",
          "Order Guide",
          "Client Script",
        ],
        answer: "Service Level Management",
        explanation:
          "Service Level Management helps organizations define, monitor and manage agreed service levels.",
      },
      {
        scenario:
          "An incident is resolved before its resolution target expires.",
        question:
          "What is the expected SLA outcome?",
        options: [
          "The SLA target was met",
          "The SLA must breach",
          "The incident becomes a problem",
          "The user is deleted",
        ],
        answer: "The SLA target was met",
        explanation:
          "If the task reaches the required state within the defined target, the SLA target is met.",
      },
    ],
  },

  users: {
    title: "Users, Groups & Roles",
    label: "USERS, GROUPS & ROLES",
    questions: [
      {
        scenario:
          "A new employee joins the Service Desk team and needs access to ServiceNow.",
        question:
          "Which record represents the employee's account?",
        options: [
          "User",
          "Group",
          "Role",
          "SLA",
        ],
        answer: "User",
        explanation:
          "A User record represents an individual who can access the ServiceNow instance.",
      },
      {
        scenario:
          "Five Service Desk agents need to be organized into one support team.",
        question:
          "What should be used?",
        options: [
          "Group",
          "Incident",
          "Knowledge Article",
          "Catalog Item",
        ],
        answer: "Group",
        explanation:
          "Groups organize users who work together or share responsibilities.",
      },
      {
        scenario:
          "A user needs permission to perform a particular function in ServiceNow.",
        question:
          "What is commonly assigned to provide that access?",
        options: [
          "Role",
          "Incident",
          "Problem",
          "SLA",
        ],
        answer: "Role",
        explanation:
          "Roles are used to control access to functionality and data according to the configured security model.",
      },
      {
        scenario:
          "A Service Desk agent needs to work on incidents assigned to their support team.",
        question:
          "What can help organize the agent's work?",
        options: [
          "Assignment Group",
          "Knowledge Article",
          "Order Guide",
          "Change Request only",
        ],
        answer: "Assignment Group",
        explanation:
          "Assignment groups organize work and identify the team responsible for handling records.",
      },
      {
        scenario:
          "An administrator wants to give a user additional access without creating a new user account.",
        question:
          "What can be assigned?",
        options: [
          "Role",
          "Incident",
          "Catalog Task",
          "SLA",
        ],
        answer: "Role",
        explanation:
          "Additional permissions can be provided through appropriate roles.",
      },
    ],
  },

  scripting: {
    title: "Business Rules & Client Scripts",
    label: "SERVICENOW SCRIPTING",
    questions: [
      {
        scenario:
          "A developer needs server-side logic to run when a record is inserted or updated.",
        question:
          "Which feature can be used?",
        options: [
          "Business Rule",
          "Client Script",
          "Catalog Item",
          "Dashboard",
        ],
        answer: "Business Rule",
        explanation:
          "Business Rules provide server-side logic that can execute during record operations.",
      },
      {
        scenario:
          "A developer wants to change a field value immediately when another field changes on a form.",
        question:
          "Which Client Script type is commonly used?",
        options: [
          "onChange",
          "onLoad",
          "onSubmit",
          "Scheduled",
        ],
        answer: "onChange",
        explanation:
          "An onChange Client Script runs when the value of a specified field changes.",
      },
      {
        scenario:
          "A developer wants to set a default value when a form first opens.",
        question:
          "Which Client Script type is appropriate?",
        options: [
          "onLoad",
          "onChange",
          "onSubmit",
          "Business Rule",
        ],
        answer: "onLoad",
        explanation:
          "An onLoad Client Script executes when the form is loaded.",
      },
      {
        scenario:
          "A developer wants to validate information before a form is submitted.",
        question:
          "Which Client Script type can be used?",
        options: [
          "onSubmit",
          "onLoad",
          "onChange",
          "Scheduled Job",
        ],
        answer: "onSubmit",
        explanation:
          "An onSubmit Client Script runs when the user attempts to submit the form.",
      },
      {
        scenario:
          "A developer needs to retrieve server-side information from a Client Script.",
        question:
          "Which mechanism can commonly be used?",
        options: [
          "GlideAjax",
          "CSS",
          "Order Guide",
          "Dashboard",
        ],
        answer: "GlideAjax",
        explanation:
          "GlideAjax can be used for client-to-server communication with an appropriate Script Include.",
      },
    ],
  },

  acl: {
    title: "Access Control",
    label: "ACCESS CONTROL",
    questions: [
      {
        scenario:
          "A sensitive field should only be visible to users with the appropriate permission.",
        question:
          "What ServiceNow security mechanism is commonly used?",
        options: [
          "ACL",
          "SLA",
          "Catalog Item",
          "Knowledge Article",
        ],
        answer: "ACL",
        explanation:
          "Access Control Rules (ACLs) are used to control access to records and fields.",
      },
      {
        scenario:
          "A user can open a record but should not be allowed to modify it.",
        question:
          "Which access operation is relevant?",
        options: [
          "Write",
          "Read",
          "Create",
          "Delete only",
        ],
        answer: "Write",
        explanation:
          "Write access controls whether a user can modify an existing record or field.",
      },
      {
        scenario:
          "A user should not be able to view a confidential field.",
        question:
          "Which access operation is relevant?",
        options: [
          "Read",
          "Write",
          "Create",
          "Delete",
        ],
        answer: "Read",
        explanation:
          "Read access controls whether the user can view the protected record or field.",
      },
      {
        scenario:
          "A developer creates an ACL requiring a specific role.",
        question:
          "What does the ACL help determine?",
        options: [
          "Whether access should be allowed",
          "How an SLA pauses",
          "Which catalog item is ordered",
          "How a report is grouped",
        ],
        answer: "Whether access should be allowed",
        explanation:
          "ACLs evaluate configured security conditions to determine whether access is permitted.",
      },
      {
        scenario:
          "A user has a role but still cannot access a protected field.",
        question:
          "What should an administrator investigate?",
        options: [
          "Applicable ACL rules and conditions",
          "Only the user's email",
          "The dashboard theme",
          "The knowledge article title",
        ],
        answer: "Applicable ACL rules and conditions",
        explanation:
          "The administrator should review the ACLs that apply to the table or field and their configured conditions.",
      },
    ],
  },

  reporting: {
    title: "Reporting & Dashboards",
    label: "REPORTING & DASHBOARDS",
    questions: [
      {
        scenario:
          "A manager wants to see the number of open incidents by priority.",
        question:
          "What can be created?",
        options: [
          "Report",
          "ACL",
          "Catalog Task",
          "Business Rule",
        ],
        answer: "Report",
        explanation:
          "Reports can visualize ServiceNow data using configured filters, groupings and visualizations.",
      },
      {
        scenario:
          "A manager wants several reports available together on one screen.",
        question:
          "What can be used?",
        options: [
          "Dashboard",
          "Client Script",
          "Problem",
          "Role only",
        ],
        answer: "Dashboard",
        explanation:
          "Dashboards can organize multiple reports and other visual components in one place.",
      },
      {
        scenario:
          "A report should display only active incidents.",
        question:
          "What can be configured?",
        options: [
          "Filter",
          "Role",
          "Catalog Variable",
          "ACL only",
        ],
        answer: "Filter",
        explanation:
          "Report filters determine which records are included in the report results.",
      },
      {
        scenario:
          "A manager wants to compare incident counts for different assignment groups.",
        question:
          "Which report feature can help organize the data?",
        options: [
          "Group by",
          "Client Script",
          "ACL",
          "Order Guide",
        ],
        answer: "Group by",
        explanation:
          "Grouping report data by a field allows values to be compared across categories such as assignment groups.",
      },
      {
        scenario:
          "A team wants a visual summary of important operational metrics.",
        question:
          "What can provide this view?",
        options: [
          "Dashboard",
          "Catalog Variable",
          "Business Rule",
          "Incident Assignment",
        ],
        answer: "Dashboard",
        explanation:
          "Dashboards provide a consolidated visual view of reports and other configured information.",
      },
    ],
  },
};
function InterviewHub({ setPage }) {
  const interviewCategories = [
    [
      "incident",
      "🔴",
      "Incident Management",
      "Prepare for Incident Management interview questions.",
    ],
    [
      "problem",
      "🟣",
      "Problem Management",
      "Prepare for Problem Management interviews.",
    ],
    [
      "change",
      "🔵",
      "Change Management",
      "Prepare for Change Management interviews.",
    ],
    [
      "knowledge",
      "🟢",
      "Knowledge Management",
      "Prepare for Knowledge Management interviews.",
    ],
    [
      "catalog",
      "🟠",
      "Service Catalog",
      "Prepare for Service Catalog interviews.",
    ],
    [
      "sla",
      "🟡",
      "SLA & SLM",
      "Prepare for SLA and SLM interviews.",
    ],
    [
      "users",
      "⚙️",
      "Users, Groups & Roles",
      "Prepare for administration and access questions.",
    ],
    [
      "scripting",
      "💻",
      "Scripting",
      "Prepare for Business Rule and Client Script questions.",
    ],
    [
      "acl",
      "🔐",
      "Access Control",
      "Prepare for ACL and security questions.",
    ],
    [
      "reporting",
      "📊",
      "Reporting & Dashboards",
      "Prepare for reporting interview questions.",
    ],
  ];

  return (
    <main className="interview-page">

      <button
        className="lesson-back"
        onClick={() => setPage("itsm")}
      >
        ← Back to ITSM
      </button>

      <section className="interview-hero">

        <div className="practice-label">
          ITSM INTERVIEW HUB
        </div>

        <h1>
          Prepare for Your <span>Interview.</span>
        </h1>

        <p>
          Practice common ServiceNow ITSM interview questions
          with answers and real-world examples.
        </p>

      </section>

      <section className="interview-flow">

        <div>📚 Learn</div>
        <span>→</span>
        <div>🧠 Practice</div>
        <span>→</span>
        <div>🎯 Quiz</div>
        <span>→</span>
        <div>💼 Interview</div>

      </section>

      <section className="interview-section">

        <div className="section-heading">
          <span>Choose Interview Topic</span>
          <small>
            Prepare topic by topic
          </small>
        </div>

        <div className="interview-grid">

          {interviewCategories.map(
            ([id, icon, title, description]) => (

              <button
                key={id}
                className="interview-card"
                onClick={() =>
                  setPage(`interview-${id}`)
                }
              >

                <div className="interview-card-icon">
                  {icon}
                </div>

                <h3>{title}</h3>

                <p>{description}</p>

                <span>
                  Start Interview Prep →
                </span>

              </button>

            )
          )}

        </div>

      </section>

    </main>
  );
}
function InterviewPrep({ setPage, topic }) {
  const interview = interviewQuestions[topic];

  if (!interview) {
    return null;
  }

  const questions = interview.questions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const question = questions[currentQuestion];

const handleNext = () => {
  setShowAnswer(false);

  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion((previous) => previous + 1);
  } else {
    setCurrentQuestion(0);
  }
};

  return (
    <main className="interview-question-page">

      <button
        className="lesson-back"
        onClick={() => setPage("interview")}
      >
        ← Back to Interview Hub
      </button>

      <section className="interview-question-header">

        <div className="practice-label">
          {interview.label}
        </div>

        <h1>
          Interview <span>Preparation</span>
        </h1>

        <p>
          Question {currentQuestion + 1} of{" "}
          {questions.length}
        </p>

      </section>

      <section className="interview-question-card">

        <div className="interview-question-number">
          QUESTION {String(currentQuestion + 1).padStart(2, "0")}
        </div>

        <h2>
          {question.question}
        </h2>

        {!showAnswer ? (

          <button
            className="practice-submit"
            onClick={() => setShowAnswer(true)}
          >
            Show Answer →
          </button>

        ) : (

          <div className="interview-answer">

            <div className="interview-answer-block">

              <strong>💡 Answer</strong>

              <p>
                {question.answer}
              </p>

            </div>

            <div className="interview-example-block">

              <strong>🌎 Real-World Example</strong>

              <p>
                {question.example}
              </p>

            </div>

            <button
              className="practice-submit"
              onClick={handleNext}
            >
              {currentQuestion === questions.length - 1
                ? "Restart Questions →"
                : "Next Question →"}
            </button>

          </div>

        )}

      </section>

    </main>
  );
}
function PracticeQuiz({ setPage, topic }) {
  const practice = practiceQuestions[topic];

  const questions = practice.questions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  const progress =
    ((currentQuestion + (submitted ? 1 : 0)) /
      questions.length) *
    100;

  const handleSubmit = () => {
    if (!selected) return;

    if (selected === question.answer) {
      setScore((previous) => previous + 1);
    }

    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setSelected("");
      setSubmitted(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelected("");
    setSubmitted(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <main className="practice-question-page">

        <button
          className="lesson-back"
          onClick={() => setPage("practice")}
        >
          ← Back to Practice Hub
        </button>

        <section className="practice-result-page">

          <div className="practice-label">
            PRACTICE COMPLETE
          </div>

          <div className="practice-result-icon">
            🎉
          </div>

          <h1>
            Great <span>Job!</span>
          </h1>

          <p>
            You completed {practice.title} Practice.
          </p>

          <div className="practice-score">

            <div className="score-number">
              {score}
              <small>/{questions.length}</small>
            </div>

            <div className="score-percentage">
              {percentage}%
            </div>

          </div>

          <div className="score-summary">

            <div>
              <strong>✓ {score}</strong>
              <span>Correct</span>
            </div>

            <div>
              <strong>
                ✕ {questions.length - score}
              </strong>
              <span>Incorrect</span>
            </div>

          </div>

          <div className="practice-result-actions">

            <button
              className="practice-submit"
              onClick={handleRestart}
            >
              Practice Again →
            </button>

            <button
              className="practice-secondary-btn"
              onClick={() => setPage("practice")}
            >
              Back to Practice Hub
            </button>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="practice-question-page">

      <button
        className="lesson-back"
        onClick={() => setPage("practice")}
      >
        ← Back to Practice Hub
      </button>

      <section className="practice-question-header">

        <div className="practice-label">
          {practice.label}
        </div>

        <h1>
          Test Your <span>Knowledge</span>
        </h1>

        <p>
          Question {currentQuestion + 1} of{" "}
          {questions.length}
        </p>

      </section>

      <section className="practice-progress-container">

        <div className="practice-progress-info">

          <span>
            Question {currentQuestion + 1} of{" "}
            {questions.length}
          </span>

          <span>
            {Math.round(progress)}%
          </span>

        </div>

        <div className="practice-progress-bar">

          <div
            className="practice-progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </section>

      <section className="practice-question-card">

        <div className="practice-scenario">

          <strong>SCENARIO</strong>

          <p>
            {question.scenario}
          </p>

        </div>

        <h2>
          {question.question}
        </h2>

        <div className="practice-options">

          {question.options.map((option) => {

            const isCorrect =
              submitted &&
              option === question.answer;

            const isWrong =
              submitted &&
              selected === option &&
              option !== question.answer;

            return (
              <button
                key={option}
                className={`practice-option ${
                  selected === option
                    ? "selected"
                    : ""
                } ${
                  isCorrect
                    ? "correct"
                    : ""
                } ${
                  isWrong
                    ? "wrong"
                    : ""
                }`}
                onClick={() =>
                  !submitted &&
                  setSelected(option)
                }
              >

                {option}

                {isCorrect && (
                  <span> ✓</span>
                )}

                {isWrong && (
                  <span> ✕</span>
                )}

              </button>
            );
          })}

        </div>

        {!submitted ? (

          <button
            className="practice-submit"
            onClick={handleSubmit}
            disabled={!selected}
          >
            Submit Answer →
          </button>

        ) : (

          <div className="practice-result">

            <h3>
              {selected === question.answer
                ? "✅ Correct!"
                : "❌ Not quite"}
            </h3>

            <p>
              {question.explanation}
            </p>

            <button
              className="practice-submit"
              onClick={handleNext}
            >
              {currentQuestion ===
              questions.length - 1
                ? "View Final Score →"
                : "Next Question →"}
            </button>

          </div>

        )}

      </section>

    </main>
  );
}
/* =========================================================
   LESSON PAGE
========================================================= */

function LessonPage({ setPage, number }) {
  const lesson = lessonData[number];
  if (!lesson) return null;

  const currentNumber = parseInt(number, 10);
  const previousNumber =
    currentNumber > 1
      ? String(currentNumber - 1).padStart(2, "0")
      : null;

  const nextNumber =
    currentNumber < itsmTopics.length
      ? String(currentNumber + 1).padStart(2, "0")
      : null;

  const previousTopic = previousNumber
    ? itsmTopics.find(([topicNumber]) => topicNumber === previousNumber)
    : null;

  const nextTopic = nextNumber
    ? itsmTopics.find(([topicNumber]) => topicNumber === nextNumber)
    : null;

  return (
    <main className="incident-page">
      <button className="lesson-back" onClick={() => setPage("itsm")}>← Back to ITSM</button>

      <section className="incident-hero">
        <div className="lesson-number">{number}</div>
        <div className="section-label">{lesson.label}</div>
        <h1>{lesson.title}<br /><span>{lesson.gradient}</span></h1>
        <p>{lesson.description}</p>

        <div className="lesson-meta">
          <div><strong>Beginner</strong><span>Level</span></div>
          <div><strong>{lesson.sections.length}</strong><span>Sections</span></div>
          <div><strong>Free</strong><span>Learning</span></div>
        </div>
      </section>

      <section className="lesson-content">
        {lesson.sections.map((section, index) => <LessonSection key={index} section={section} />)}
        {lesson.challenge && (
  <article className="lesson-block">
    <PracticeChallenge
      title={lesson.challenge.title}
      scenario={lesson.challenge.scenario}
      question={lesson.challenge.question}
      options={lesson.challenge.options}
      correctAnswer={lesson.challenge.answer}
      explanation={lesson.challenge.explanation}
    />
  </article>
)}

{lesson.interview && (
  <InterviewQuestions questions={lesson.interview} />
)}

        <div className="lesson-navigation">

  {previousTopic ? (
    <button
      className="lesson-nav-btn previous"
      onClick={() => setPage(`itsm-${previousNumber}`)}
    >
      <span>←</span>
      <div>
        <small>PREVIOUS TOPIC</small>
        <strong>{previousTopic[1]}</strong>
      </div>
    </button>
  ) : (
    <div></div>
  )}

  <button
    className="lesson-nav-back"
    onClick={() => setPage("itsm")}
  >
    All ITSM Topics
  </button>

  {nextTopic ? (
    <button
      className="lesson-nav-btn next"
      onClick={() => setPage(`itsm-${nextNumber}`)}
    >
      <div>
        <small>NEXT TOPIC</small>
        <strong>{nextTopic[1]}</strong>
      </div>
      <span>→</span>
    </button>
  ) : (
    <div></div>
  )}

</div>
      </section>
    </main>
  );
}

/* =========================================================
   SIMPLE PAGES
========================================================= */



function AboutPage() {
  return (
    <main className="about-page">

      {/* ABOUT HERO */}
      <section className="about-hero">

        <div className="section-label">
          ABOUT SNOWHUB BY SIVA
        </div>

        <h1>
          Welcome to
          <br />
          <span>SnowHub By Siva.</span>
        </h1>

        <p>
          SnowHub By Siva is a dedicated ServiceNow learning website
          created to make learning simple, practical and easy to follow.
        </p>

      </section>


      {/* ABOUT CONTENT */}
      <section className="about-content">

        <div className="about-card">
          <div className="about-icon"> ?</div>

          <div>
            <h2>What is SnowHub By Siva?</h2>

            <p>
              SnowHub is a learning platform focused on ServiceNow.
              It brings together concepts, practical examples,
              practice questions and interview preparation in one place.
            </p>
          </div>
        </div>


        <div className="about-card">
          <div className="about-icon">📚</div>

          <div>
            <h2>Learn ServiceNow</h2>

            <p>
              Explore ServiceNow concepts through simple explanations
              and practical learning. SnowHub By Siva  is designed for learners
              who want to build their knowledge step by step.
            </p>
          </div>
        </div>


        <div className="about-card">
          <div className="about-icon">🚀</div>

          <div>
            <h2>Our Goal</h2>

            <p>
              The goal of SnowHub  By Sivais simple — make ServiceNow learning
              easier, more practical and accessible for everyone.
            </p>
          </div>
        </div>

      </section>


      {/* SNOWHUB BRAND */}
      <section className="about-signature">

        <div className="section-label">
          SNOWHUB BY SIVA
        </div>

        <h2>Learn. Practice. Prepare.</h2>

        <p>
          Your journey to better ServiceNow knowledge starts here.
        </p>


        {/* WEBSITE */}
        <div className="about-contact">

          <div className="contact-section-title">
            🌐 SnowHub By Siva Website
          </div>

          <a
            href="/"
            className="contact-item"
          >
            <div className="contact-icon">?</div>

            <div>
              <strong>SnowHub By Siva</strong>
              <span>Explore ServiceNow learning resources</span>
            </div>

            <div className="contact-arrow">→</div>
          </a>


          {/* INSTAGRAM */}
          <div className="contact-section-title">
            📸 Follow SnowHub By Siva
          </div>

          <a
            href="https://www.instagram.com/snowhub_by_siva?utm_source=qr&stkn=MTl3ZTVqYXd5YWR4bg=="
            target="_blank"
            rel="noreferrer"
            className="contact-item"
          >
            <div className="contact-icon">📸</div>

            <div>
              <strong>Instagram</strong>
              <span>@snowhub_by_siva</span>
            </div>

            <div className="contact-arrow">→</div>
          </a>


          {/* MOBILE */}
          <div className="contact-section-title">
            📱 Contact
          </div>

          <a
            href="tel:+91"
            className="contact-item"
          >
            <div className="contact-icon">📱</div>

            <div>
              <strong>Mobile</strong>
              <span>+916304664130 </span>
            </div>

            <div className="contact-arrow">→</div>
          </a>

        </div>


        <div className="about-tagline">
          Learn. Practice. Prepare. Build.
        </div>

      </section>

    </main>
  );
}
/* =========================================================
   PRACTICE CHALLENGE
========================================================= */

function PracticeChallenge({
  title,
  scenario,
  question,
  options,
  correctAnswer,
  explanation,
}) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleCheck = () => {
    if (!selected) return;
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div className="practice-challenge">

      <div className="practice-challenge-header">
        <div className="practice-icon">
          🧩
        </div>

        <div>
          <div className="lesson-label">
            PRACTICE CHALLENGE
          </div>

          <h3>
            {title}
          </h3>
        </div>
      </div>


      {/* SCENARIO */}

      <div className="practice-scenario">

        <div className="practice-label">
          Scenario
        </div>

        <p>
          {scenario}
        </p>

      </div>


      {/* QUESTION */}

      <div className="practice-question">

        <div className="practice-label">
          Your Task
        </div>

        <h4>
          {question}
        </h4>

      </div>


      {/* OPTIONS */}

      <div className="practice-options">

        {options.map((option) => {

          let className = "practice-option";

          if (selected === option) {
            className += " selected";
          }

          if (submitted && option === correctAnswer) {
            className += " correct";
          }

          if (
            submitted &&
            selected === option &&
            option !== correctAnswer
          ) {
            className += " wrong";
          }

          return (
            <button
              key={option}
              className={className}
              onClick={() => {
                if (!submitted) {
                  setSelected(option);
                }
              }}
            >

              <span>
                {option}
              </span>

              <span className="practice-option-arrow">

                {submitted && option === correctAnswer
                  ? "✓"
                  : "→"}

              </span>

            </button>
          );

        })}

      </div>


      {/* CHECK BUTTON */}

      {!submitted && (

        <button
          className="practice-check"
          onClick={handleCheck}
          disabled={!selected}
        >
          Check Answer →
        </button>

      )}


      {/* RESULT */}

      {submitted && (

        <div
          className={
            selected === correctAnswer
              ? "practice-result success"
              : "practice-result error"
          }
        >

          <div className="practice-result-title">

            {selected === correctAnswer
              ? "✓ Correct!"
              : "✕ Not quite"}

          </div>


          <p>
            <strong>Why:</strong>{" "}
            {explanation}
          </p>


          {selected !== correctAnswer && (

            <p className="practice-correct-answer">

              <strong>
                Correct Answer:
              </strong>{" "}
              {correctAnswer}

            </p>

          )}

        </div>

      )}


      {/* RETRY */}

      {submitted && (

        <button
          className="practice-retry"
          onClick={handleRetry}
        >
          Try Again
        </button>

      )}

    </div>
  );
}
function InterviewQuestions({ questions }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <article className="lesson-block interview-section">
      <div className="lesson-label">INTERVIEW PREPARATION</div>

      <h2>Quick Interview Questions</h2>

      <p>
        Test yourself with common ServiceNow interview questions related to
        this topic.
      </p>

      <div className="interview-list">
        {questions.map((item, index) => {
          const open = openIndex === index;

          return (
            <div
              className={`interview-item ${open ? "open" : ""}`}
              key={index}
            >
              <button
                className="interview-question-btn"
                onClick={() =>
                  setOpenIndex(open ? null : index)
                }
              >
                <span>
                  <small>Q{index + 1}</small>
                  {item.question}
                </span>

                <span>{open ? "−" : "+"}</span>
              </button>

              {open && (
                <div className="interview-answer">
                  <span>Answer</span>
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
}
function GlobalSearch({ setPage, setShowSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const search = searchTerm.trim().toLowerCase();

  const results = itsmTopics.filter((topic) => {
    const title = topic[1].toLowerCase();
    const description = topic[2].toLowerCase();

    return (
      title.includes(search) ||
      description.includes(search)
    );
  });

  const openLesson = (number) => {
    setShowSearch(false);
    setPage(`lesson-${number}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div
      className="global-search-overlay"
      onClick={() => setShowSearch(false)}
    >
      <div
        className="global-search-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* SEARCH HEADER */}
        <div className="global-search-header">

          <div>
            <div className="section-label">
              SNOWHUB BY SIVA SEARCH
            </div>

            <h2>
              Search <span>ServiceNow.</span>
            </h2>
          </div>

          <button
            className="global-search-close"
            onClick={() => setShowSearch(false)}
            aria-label="Close search"
          >
            ×
          </button>

        </div>


        {/* SEARCH INPUT */}
        <div className="global-search-input">

          <span className="global-search-icon">
            🔍
          </span>

          <input
            autoFocus
            type="text"
            placeholder="Search ITSM topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <button
              className="global-search-clear"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>


        {/* SEARCH RESULTS */}
        <div className="global-search-results">

          {search === "" ? (

            <div className="global-search-empty">

              <div className="global-search-empty-icon">
                🔍
              </div>

              <h3>What are you looking for?</h3>

              <p>
                Search for Incident, Problem, Change, SLA,
                Business Rules or any ITSM topic.
              </p>

              <div className="search-suggestions">

                <button onClick={() => setSearchTerm("Incident")}>
                  Incident
                </button>

                <button onClick={() => setSearchTerm("Change")}>
                  Change
                </button>

                <button onClick={() => setSearchTerm("SLA")}>
                  SLA
                </button>

                <button onClick={() => setSearchTerm("Business Rules")}>
                  Business Rules
                </button>

              </div>

            </div>

          ) : results.length === 0 ? (

            <div className="global-search-empty">

              <div className="global-search-empty-icon">
                😕
              </div>

              <h3>No results found</h3>

              <p>
                We couldn't find an ITSM topic matching
                "<strong>{searchTerm}</strong>".
              </p>

              <button
                className="search-reset-btn"
                onClick={clearSearch}
              >
                Clear Search
              </button>

            </div>

          ) : (

            <div className="search-results-list">

              <div className="search-results-count">
                {results.length} topic
                {results.length !== 1 ? "s" : ""} found
              </div>

              {results.map(([number, title, description]) => (

                <button
                  className="global-search-result"
                  key={number}
                  onClick={() => openLesson(number)}
                >

                  <span className="global-search-number">
                    {number}
                  </span>

                  <span className="global-search-result-content">

                    <strong>{title}</strong>

                    <small>{description}</small>

                  </span>

                  <span className="global-search-arrow">
                    →
                  </span>

                </button>

              ))}

            </div>

          )}

        </div>

      </div>
    </div>
  );
}
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 👋 I'm SnowHub By Siva Assistant. Ask me anything about ServiceNow."
    }
  ]);

  const getReply = (question) => {
    const q = question.toLowerCase();

    if (q.includes("incident")) {
      return "Incident Management focuses on restoring normal service as quickly as possible after an interruption.";
    }

    if (q.includes("problem")) {
      return "Problem Management focuses on identifying and removing the root cause of incidents.";
    }

    if (q.includes("change")) {
      return "Change Management helps control changes while reducing risk and service disruption.";
    }

    if (q.includes("sla")) {
      return "SLA means Service Level Agreement. It defines an agreed level of service and target completion time.";
    }

    if (q.includes("business rule")) {
      return "A Business Rule is server-side logic that runs when records are inserted, updated, deleted, or queried.";
    }

    if (q.includes("client script")) {
      return "A Client Script runs in the browser and is commonly used to control form behavior.";
    }

    if (q.includes("catalog")) {
      return "Service Catalog allows users to request services and items through catalog items.";
    }

    if (q.includes("cmdb")) {
      return "CMDB stores information about Configuration Items and their relationships.";
    }

    if (
      q.includes("hi") ||
      q.includes("hello") ||
      q.includes("hey")
    ) {
      return "Hello! 👋 What ServiceNow topic would you like to learn?";
    }

    return "I can currently help with Incident, Problem, Change, SLA, Business Rules, Client Scripts, Service Catalog and CMDB. Try asking about one of these topics.";
  };

  const sendMessage = () => {
    const text = message.trim();

    if (!text) return;

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: text
      },
      {
        sender: "bot",
        text: getReply(text)
      }
    ]);

    setMessage("");
  };

  return (
    <>
      {!isOpen && (
        <button
          className="chatbot-floating-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open SnowHub By Siva Assistant"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">

          <div className="chatbot-header">

            <div className="chatbot-title">
              <div className="chatbot-avatar">
                
              </div>

              <div>
                <strong>SnowHub By Siva Assistant</strong>
                <span>ServiceNow Learning</span>
              </div>
            </div>

            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

          </div>


          <div className="chatbot-messages">

            {messages.map((item, index) => (
              <div
                key={index}
                className={`chat-message ${item.sender}`}
              >
                {item.text}
              </div>
            ))}

          </div>


          <div className="chatbot-suggestions">

            <button
              onClick={() =>
                setMessage("What is Incident Management?")
              }
            >
              Incident
            </button>

            <button
              onClick={() =>
                setMessage("What is a Business Rule?")
              }
            >
              Business Rule
            </button>

            <button
              onClick={() =>
                setMessage("What is SLA?")
              }
            >
              SLA
            </button>

          </div>


          <div className="chatbot-input">

            <input
              type="text"
              placeholder="Ask a ServiceNow question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button onClick={sendMessage}>
              ➤
            </button>

          </div>

        </div>
      )}
    </>
  );
}
function createSectionId(text) {
  return text
    .replace(/^\d+\.\s*/, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
const cloudSectionVisuals = {
 "What is Cloud Computing?": {
  icon: "☁️",
  type: "cloud",
  items: ["Servers", "Storage", "Databases", "Applications"],
  visualTitle: "Cloud Computing Resources",
  visualDescription:
    "Cloud computing provides computing resources over a network instead of requiring organizations to own all the infrastructure.",
},

 "Before Cloud — Traditional / On-Premises IT": {
  icon: "🖥️",
  type: "servers",
  items: ["Company", "Physical Servers", "Storage", "Network"],
  visualTitle: "Traditional On-Premises Environment",
  visualDescription:
    "Organizations owned and maintained their physical infrastructure inside their own environment.",
},

"Problems with Traditional Infrastructure": {
  icon: "⚠️",
  type: "problems",
  items: ["High Cost", "Maintenance", "Scaling", "Downtime"],
  visualTitle: "Traditional IT Challenges",
  visualDescription:
    "Managing physical infrastructure can introduce cost, maintenance, scaling and availability challenges.",
},
"How Cloud Changed IT": {
  icon: "🔄",
  type: "change",
  items: ["Traditional IT", "Cloud", "On-Demand Resources"],
  visualTitle: "From Traditional IT to Cloud",
  visualDescription:
    "Cloud computing changed how organizations obtain, scale and manage computing resources.",
},

 "Key Characteristics of Cloud": {
  icon: "⚡",
  type: "characteristics",
  items: ["On-Demand", "Scalable", "Accessible", "Measured"],
  visualTitle: "Key Cloud Characteristics",
  visualDescription:
    "Cloud environments provide resources when needed, support scaling, enable access over networks and allow usage to be measured.",
},

 "Benefits of Cloud Computing": {
  icon: "🚀",
  type: "benefits",
  items: ["Cost", "Speed", "Scalability", "Flexibility"],
  visualTitle: "Why Organizations Use Cloud",
  visualDescription:
    "Cloud computing can help organizations reduce infrastructure overhead, access resources quickly and scale according to demand.",
},

"Types of Cloud": {
  icon: "☁️",
  type: "types",
  items: ["Public Cloud", "Private Cloud", "Hybrid Cloud"],
  visualTitle: "Types of Cloud Deployment",
  visualDescription:
    "Organizations can choose different cloud deployment approaches based on ownership, control, security and business requirements.",
},

 "Cloud Service Models": {
  icon: "🧱",
  type: "models",
  items: ["IaaS", "PaaS", "SaaS"],
  visualTitle: "Cloud Service Models",
  visualDescription:
    "Cloud service models describe how much of the underlying infrastructure and platform is managed by the cloud provider.",
},

  "On-Premises vs Cloud": {
  icon: "⚖️",
  type: "compare",
  items: ["On-Premises", "Cloud"],
  visualTitle: "On-Premises vs Cloud",
  visualDescription:
    "The main difference is where infrastructure is hosted and who is responsible for managing it.",
},

 "Cloud and ServiceNow — How They Relate": {
  icon: "🔗",
  type: "servicenow",
  items: ["Cloud", "Platform", "ServiceNow"],
  visualTitle: "Cloud + ServiceNow",
  visualDescription:
    "ServiceNow is a cloud-based platform that organizations use to manage digital workflows, services and IT operations.",
},

 "What You Should Know Before Learning ServiceNow": {
  icon: "🧭",
  type: "roadmap",
  items: ["Cloud Basics", "ServiceNow", "ITSM"],
  visualTitle: "Your Learning Foundation",
  visualDescription:
    "Understanding basic cloud concepts gives you useful context before starting your ServiceNow learning journey.",
},

  "Summary": {
  icon: "🎯",
  type: "summary",
  items: ["Understand", "Connect", "Apply"],
  visualTitle: "Cloud Fundamentals — Key Takeaways",
  visualDescription:
    "You now have the foundation needed to understand cloud computing and how it connects with ServiceNow.",
},
};
function CloudSectionVisual({ visual }) {
  if (!visual) return null;

  const type = visual.type;

  return (
    <div className={`cloud-section-visual visual-${type}`}>

      <div className="cloud-visual-header">
       

        <div>
          <span>SNOWHUB BY SIVA VISUAL</span>

          {visual.visualTitle && (
            <h4>{visual.visualTitle}</h4>
          )}
        </div>
      </div>

      {visual.visualDescription && (
        <p className="cloud-visual-description">
          {visual.visualDescription}
        </p>
      )}


      {/* =========================================
          SECTION 1 — CLOUD RESOURCES
      ========================================= */}

      {type === "cloud" && (
        <div className="cloud-diagram cloud-resources-diagram">

          <div className="cloud-main-node">
            ☁️
            <strong>Cloud</strong>
            <small>Computing Resources</small>
          </div>

          <div className="cloud-branches">

            <div className="cloud-diagram-node">
              🖥️
              <strong>Servers</strong>
            </div>

            <div className="cloud-diagram-node">
              💾
              <strong>Storage</strong>
            </div>

            <div className="cloud-diagram-node">
              🗄️
              <strong>Databases</strong>
            </div>

            <div className="cloud-diagram-node">
              📱
              <strong>Applications</strong>
            </div>

          </div>

        </div>
      )}


      {/* =========================================
          SECTION 2 — ON PREMISES
      ========================================= */}

      {type === "servers" && (
        <div className="cloud-diagram onprem-diagram">

          <div className="onprem-company">
            🏢
            <strong>Company</strong>
          </div>

          <div className="diagram-line">
            ↓
          </div>

          <div className="onprem-resources">

            <div>
              🖥️
              <strong>Physical Servers</strong>
            </div>

            <div>
              💾
              <strong>Storage</strong>
            </div>

            <div>
              🌐
              <strong>Network</strong>
            </div>

          </div>

        </div>
      )}


      {/* =========================================
          SECTION 3 — PROBLEMS
      ========================================= */}

      {type === "problems" && (
        <div className="problem-diagram">

          <div className="problem-center">
            ⚠️
            <strong>Traditional IT</strong>
          </div>

          <div className="problem-grid">

            <div>
              💰
              <strong>High Cost</strong>
            </div>

            <div>
              🔧
              <strong>Maintenance</strong>
            </div>

            <div>
              📈
              <strong>Scaling</strong>
            </div>

            <div>
              ⏱️
              <strong>Downtime</strong>
            </div>

          </div>

        </div>
      )}


      {/* =========================================
          SECTION 4 — CLOUD CHANGE
      ========================================= */}

      {type === "change" && (
        <div className="change-diagram">

          <div className="change-node">
            🖥️
            <strong>Traditional IT</strong>
          </div>

          <div className="change-arrow">
            →
          </div>

          <div className="change-node cloud-highlight">
            ☁️
            <strong>Cloud</strong>
          </div>

          <div className="change-arrow">
            →
          </div>

          <div className="change-node">
            ⚡
            <strong>On-Demand</strong>
          </div>

        </div>
      )}


      {/* =========================================
          SECTION 5 — CHARACTERISTICS
      ========================================= */}

      {type === "characteristics" && (
        <div className="characteristics-diagram">

          <div className="characteristic-card">
            ⚡
            <strong>On-Demand</strong>
            <small>Use when needed</small>
          </div>

          <div className="characteristic-card">
            📈
            <strong>Scalable</strong>
            <small>Grow when required</small>
          </div>

          <div className="characteristic-card">
            🌐
            <strong>Accessible</strong>
            <small>Access over network</small>
          </div>

          <div className="characteristic-card">
            📊
            <strong>Measured</strong>
            <small>Track usage</small>
          </div>

        </div>
      )}


      {/* =========================================
          SECTION 6 — BENEFITS
      ========================================= */}

      {type === "benefits" && (
        <div className="benefits-diagram">

          <div className="benefits-cloud">
            ☁️
            <strong>Cloud</strong>
          </div>

          <div className="benefits-grid">

            <div className="benefit-card">
              💰
              <strong>Cost Efficiency</strong>
              <small>Reduce infrastructure overhead</small>
            </div>

            <div className="benefit-card">
              ⚡
              <strong>Faster Access</strong>
              <small>Get resources quickly</small>
            </div>

            <div className="benefit-card">
              📈
              <strong>Scalability</strong>
              <small>Scale with demand</small>
            </div>

            <div className="benefit-card">
              🔄
              <strong>Flexibility</strong>
              <small>Adapt to changing needs</small>
            </div>

          </div>

        </div>
      )}


      {/* =========================================
          SECTION 7 — TYPES OF CLOUD
      ========================================= */}

      {type === "types" && (
        <div className="cloud-types-diagram">

          <div className="cloud-type-card public-cloud">
            <div className="cloud-type-icon">
              🌐
            </div>

            <h4>Public Cloud</h4>

            <p>
              Cloud infrastructure shared among
              multiple customers.
            </p>

            <span>
              Shared Infrastructure
            </span>
          </div>


          <div className="cloud-type-card private-cloud">
            <div className="cloud-type-icon">
              🏢
            </div>

            <h4>Private Cloud</h4>

            <p>
              Cloud environment dedicated to
              a single organization.
            </p>

            <span>
              Dedicated Environment
            </span>
          </div>


          <div className="cloud-type-card hybrid-cloud">
            <div className="cloud-type-icon">
              🔗
            </div>

            <h4>Hybrid Cloud</h4>

            <p>
              Combination of private and public
              cloud environments.
            </p>

            <span>
              Combined Approach
            </span>
          </div>

        </div>
      )}


      {/* =========================================
          SECTION 8 — SERVICE MODELS
      ========================================= */}

      {type === "models" && (
        <div className="cloud-models-diagram">

          <div className="model-card">

            <div className="model-icon">
              🖥️
            </div>

            <div className="model-badge">
              IaaS
            </div>

            <h4>
              Infrastructure as a Service
            </h4>

            <p>
              Provides infrastructure resources
              such as servers, storage and networking.
            </p>

            <div className="model-example">
              Infrastructure
            </div>

          </div>


          <div className="model-card model-highlight">

            <div className="model-icon">
              ⚙️
            </div>

            <div className="model-badge">
              PaaS
            </div>

            <h4>
              Platform as a Service
            </h4>

            <p>
              Provides a platform where developers
              can build and deploy applications.
            </p>

            <div className="model-example">
              Development Platform
            </div>

          </div>


          <div className="model-card">

            <div className="model-icon">
              📱
            </div>

            <div className="model-badge">
              SaaS
            </div>

            <h4>
              Software as a Service
            </h4>

            <p>
              Provides ready-to-use software
              applications over the internet.
            </p>

            <div className="model-example">
              Ready-to-Use Software
            </div>

          </div>

        </div>
      )}


      {/* =========================================
          SECTION 9 — ON PREMISES VS CLOUD
      ========================================= */}

      {type === "compare" && (
        <div className="cloud-compare-diagram">

          <div className="compare-side">

            <div className="compare-icon">
              🏢
            </div>

            <h4>
              On-Premises
            </h4>

            <div className="compare-item">
              <span>🖥️</span>
              <strong>Own Infrastructure</strong>
            </div>

            <div className="compare-item">
              <span>🔧</span>
              <strong>Organization Maintains</strong>
            </div>

            <div className="compare-item">
              <span>💰</span>
              <strong>Infrastructure Investment</strong>
            </div>

          </div>


          <div className="compare-vs">
            VS
          </div>


          <div className="compare-side compare-cloud">

            <div className="compare-icon">
              ☁️
            </div>

            <h4>
              Cloud
            </h4>

            <div className="compare-item">
              <span>☁️</span>
              <strong>Cloud Infrastructure</strong>
            </div>

            <div className="compare-item">
              <span>⚙️</span>
              <strong>Provider Managed</strong>
            </div>

            <div className="compare-item">
              <span>📈</span>
              <strong>Scale as Needed</strong>
            </div>

          </div>

        </div>
      )}


      {/* =========================================
          SECTION 10 — CLOUD + SERVICENOW
      ========================================= */}

      {type === "servicenow" && (
        <div className="servicenow-cloud-diagram">

          <div className="sn-flow-card">

            <div className="sn-flow-icon">
              ☁️
            </div>

            <h4>
              Cloud
            </h4>

            <p>
              Provides the environment and
              infrastructure for cloud-based services.
            </p>

          </div>


          <div className="sn-flow-arrow">
            →
          </div>


          <div className="sn-flow-card sn-main-card">

            <div className="sn-flow-icon">
              ⚙️
            </div>

            <h4>
              ServiceNow
            </h4>

            <p>
              A cloud-based platform for digital
              workflows and service management.
            </p>

          </div>


          <div className="sn-flow-arrow">
            →
          </div>


          <div className="sn-flow-card">

            <div className="sn-flow-icon">
              🚀
            </div>

            <h4>
              Business Workflows
            </h4>

            <p>
              Organizations manage services and
              workflows through the platform.
            </p>

          </div>

        </div>
      )}


      {/* =========================================
          SECTION 11 — LEARNING ROADMAP
      ========================================= */}

      {type === "roadmap" && (
        <div className="learning-roadmap">

          <div className="roadmap-step">

            <div className="roadmap-number">
              01
            </div>

            <div className="roadmap-icon">
              ☁️
            </div>

            <h4>
              Cloud Basics
            </h4>

            <p>
              Understand basic cloud concepts
              and terminology.
            </p>

          </div>


          <div className="roadmap-line">
            →
          </div>


          <div className="roadmap-step">

            <div className="roadmap-number">
              02
            </div>

            <div className="roadmap-icon">
              ⚙️
            </div>

            <h4>
              ServiceNow
            </h4>

            <p>
              Learn the platform, interface,
              tables and applications.
            </p>

          </div>


          <div className="roadmap-line">
            →
          </div>


          <div className="roadmap-step">

            <div className="roadmap-number">
              03
            </div>

            <div className="roadmap-icon">
              🛠️
            </div>

            <h4>
              ITSM
            </h4>

            <p>
              Apply ServiceNow to IT service
              management.
            </p>

          </div>

        </div>
      )}


      {/* =========================================
          SECTION 12 — SUMMARY
      ========================================= */}

      {type === "summary" && (
        <div className="summary-diagram">

          <div className="summary-card">

            <div className="summary-icon">
              🧠
            </div>

            <h4>
              Understand
            </h4>

            <p>
              Understand what cloud computing is
              and why organizations use it.
            </p>

          </div>


          <div className="summary-arrow">
            →
          </div>


          <div className="summary-card">

            <div className="summary-icon">
              🔗
            </div>

            <h4>
              Connect
            </h4>

            <p>
              Connect cloud concepts with
              ServiceNow and ITSM.
            </p>

          </div>


          <div className="summary-arrow">
            →
          </div>


          <div className="summary-card">

            <div className="summary-icon">
              🚀
            </div>

            <h4>
              Apply
            </h4>

            <p>
              Use this foundation as you continue
              learning ServiceNow.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}


        
  
 
function CloudFundamentalsPage({ setPage }) {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentSection, setCurrentSection] = useState(0);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  useEffect(() => {
    const loadLesson = async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("lesson_number", 1)
        .eq("published", true)
        .single();

      if (error) {
        console.error("Cloud Fundamentals error:", error);
        setError("Unable to load this lesson.");
        setLoading(false);
        return;
      }

      setLesson(data);
      setLoading(false);
    };

    loadLesson();
  }, []);

  /*
   * Convert the Markdown content into sections.
   * Every ## heading becomes one section.
   */
  const sections = lesson
    ? lesson.content
        .split(/^##\s+/m)
        .filter((section) => section.trim())
        .map((section) => {
          const lines = section.split("\n");

          return {
            heading: lines[0].trim(),
            content: lines.slice(1).join("\n").trim(),
          };
        })
    : [];

  const totalSections = sections.length;

  const activeSection = sections[currentSection];

  const goToNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection((current) => current + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const goToPrevious = () => {
    if (currentSection > 0) {
      setCurrentSection((current) => current - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const submitFeedback = async () => {
    if (!feedbackType) return;

    setFeedbackLoading(true);

    const { error } = await supabase
      .from("course_feedback")
      .insert([
        {
          course_name: "Cloud Fundamentals",
          feedback_type: feedbackType,
          feedback_text:
            feedbackType === "dislike"
              ? feedbackText.trim() || null
              : null,
        },
      ]);

    setFeedbackLoading(false);

    if (error) {
      console.error("Feedback submission error:", error);
      return;
    }

    setFeedbackSubmitted(true);
  };

  if (loading) {
    return (
      <main className="lesson-page">
        <button
  className="back-to-courses"
  onClick={() => setPage("courses")}
>
  ← Back to Courses
</button>
        <div className="lesson-loading">
          <div className="section-label">SnowHub By Siva</div>
          <h2>Loading course...</h2>
          <p>Getting Cloud Fundamentals from SnowHub By Siva.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="lesson-page">
        <div className="lesson-loading">
          <div className="section-label">SNOWHUB</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  if (!activeSection) {
    return (
      <main className="lesson-page">
        <div className="lesson-loading">
          <div className="section-label">SNOWHUB</div>
          <h2>No course content found</h2>
          <p>Please check the Cloud Fundamentals content in Supabase.</p>
        </div>
      </main>
    );
  }

  const isFirstSection = currentSection === 0;
  const isLastSection = currentSection === totalSections - 1;

  return (
    <main className="lesson-page">
{/* Back to Main Courses */}
    <button
      className="back-to-courses"
      onClick={() => setPage("courses")}
    >
      ← Back to Courses
    </button>
      {/* Course Header */}
      <section className="lesson-hero">

        <div className="section-label">
          CLOUD FUNDAMENTALS
        </div>

        <h1>
          {lesson.title}
        </h1>

        <p>
          {lesson.description}
        </p>

      </section>

      {/* Current Section */}
      <section className="lesson-content-wrapper">

        <article className="lesson-content-card">

  <div className="course-section-label">
    SECTION {currentSection + 1}
  </div>

  <div className="cloud-section-title-row">

    <div className="cloud-section-icon">
      {
        cloudSectionVisuals[
          activeSection.heading.replace(/^\d+\.\s*/, "")
        ]?.icon || "☁️"
      }
    </div>

    <h2 className="course-section-title">
      {activeSection.heading.replace(/^\d+\.\s*/, "")}
    </h2>

  </div>

  <CloudSectionVisual
    visual={
      cloudSectionVisuals[
        activeSection.heading.replace(/^\d+\.\s*/, "")
      ]
    }
  />

  {(() => {
  const parts = activeSection.content.split(
    /###\s+SnowHub By Siva Takeaway/i
  );

  const normalContent = parts[0].trim();
  const takeawayContent = parts[1]?.trim();

  return (
    <>
      <ReactMarkdown>
        {normalContent}
      </ReactMarkdown>

      {takeawayContent && (
        <div className="snowhub-takeaway">
          <div className="snowhub-takeaway-title">
            💡 <span>SNOWHUB BY SIVA TAKEAWAY</span>
          </div>

          <div className="snowhub-takeaway-content">
            <ReactMarkdown>
              {takeawayContent}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
})()}

</article>

      </section>

      {/* Previous / Next Navigation */}
      <div className="course-navigation-buttons">

        {isFirstSection ? (
          <div></div>
        ) : (
          <button
            className="course-nav-button previous"
            onClick={goToPrevious}
          >
            ← Previous
          </button>
        )}

        {!isLastSection && (
          <button
            className="course-nav-button next"
            onClick={goToNext}
          >
            Next →
          </button>
        )}

      </div>

      {/* Feedback only on final section */}
      {isLastSection && (
        <section className="course-feedback-section">

          {!feedbackSubmitted ? (
            <>
              <div className="section-label">
                YOUR FEEDBACK
              </div>

              <h2>
                Did you like this course?
              </h2>

              <p>
                Your feedback helps us improve SnowHub for future learners.
              </p>

              <div className="feedback-buttons">

                <button
                  className={`feedback-choice ${
                    feedbackType === "like" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setFeedbackType("like");
                    setFeedbackOpen(true);
                  }}
                >
                  <span>👍</span>
                  <strong>Like</strong>
                </button>

                <button
                  className={`feedback-choice ${
                    feedbackType === "dislike" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setFeedbackType("dislike");
                    setFeedbackOpen(true);
                  }}
                >
                  <span>👎</span>
                  <strong>Dislike</strong>
                </button>

              </div>

              {feedbackOpen && (
                <div className="feedback-form">

                  {feedbackType === "dislike" && (
                    <>
                      <h3>
                        What could we improve?
                      </h3>

                      <p>
                        Tell us what we can improve for future learners.
                      </p>

                      <textarea
                        value={feedbackText}
                        onChange={(e) =>
                          setFeedbackText(e.target.value)
                        }
                        placeholder="Write your suggestion..."
                        rows="5"
                      />
                    </>
                  )}

                  {feedbackType === "like" && (
                    <p className="feedback-thanks">
                      ❤️ Thanks for your feedback! We're glad you
                      enjoyed the course.
                    </p>
                  )}

                  <button
                    className="feedback-submit"
                    onClick={submitFeedback}
                    disabled={feedbackLoading}
                  >
                    {feedbackLoading
                      ? "Submitting..."
                      : "Submit Feedback"}
                  </button>

                </div>
              )}

            </>
          ) : (
            <div className="feedback-success">

              <div className="feedback-success-icon">
                ✓
              </div>

              <h2>
                Thank you! 🙌
              </h2>

              <p>
                Your feedback will help us improve SnowHub.
              </p>

            </div>
          )}

        </section>
      )}

    </main>
  );
}
/* =========================================================
   APP
========================================================= */

function App() {
  const getPageFromPath = () => {
      
    const path = window.location.pathname.replace(/^\/+|\/+$/g, "");

    return path || "home";
  };

  const [page, setPage] = useState(getPageFromPath);
  const [showSearch, setShowSearch] = useState(false);
  // SUPABASE TEST — TOP LEVEL
 
  useEffect(() => {
    const handlePopState = () => {
      setPage(getPageFromPath());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (nextPage) => {
    const nextPath = nextPage === "home" ? "/" : `/${nextPage}`;

    window.history.pushState({}, "", nextPath);
    setPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 const itsmLessonPages = {
  "itsm-01": "01",
  "itsm-02": "02",
  "itsm-03": "03",
  "itsm-04": "04",
  "itsm-05": "05",
  "itsm-06": "06",
  "itsm-07": "07",
  "itsm-08": "08",
  "itsm-09": "09",
  "itsm-10": "10",
  "itsm-11": "11",
  "itsm-12": "12",
};

  return (
    <div className="snowhub">
      <Navbar
  page={page}
  setPage={navigate}
  setShowSearch={setShowSearch}
/>
{showSearch && (
  <GlobalSearch
    setPage={navigate}
    setShowSearch={setShowSearch}
  />
)}
      {page === "home" && <HomePage setPage={navigate} />}
{page === "courses" && <CoursesPage setPage={navigate} />}

{page === "itsm" && <ITSMPage setPage={navigate} />}
{page === "cloud-fundamentals" && (
  <CloudFundamentalsPage setPage={navigate} />
)}
      {itsmLessonPages[page] && (
  <LessonPage setPage={navigate} number={itsmLessonPages[page]} />
)}
      {page === "practice" && (
  <PracticeHub setPage={navigate} />
)}
{page === "interview" && (
  <InterviewHub setPage={navigate} />
)}

{page.startsWith("interview-") &&
  page !== "interview" && (
    <InterviewPrep
  setPage={navigate}
  topic={page.replace("interview-", "")}
/>
  )}

{page.startsWith("practice-") &&
  page !== "practice" && (
  <PracticeQuiz
  setPage={navigate}
  topic={page.replace("practice-", "")}
/>
  )}
   
      {page === "about" && <AboutPage />}
      <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-brand">
          <div className="footer-logo">
            Snow<span>Hub</span>
          </div>

          <div className="footer-signature">
            — By Siva —
          </div>

          <p>
            Learn ServiceNow through practical tutorials,
            real-world examples and interview preparation.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>

          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("courses")}>Courses</button>
          <button onClick={() => setPage("interview")}>Interview</button>
          <button onClick={() => setPage("about")}>About</button>
        </div>

        <div className="footer-links">
          <h4>Learning</h4>

          <button onClick={() => setPage("itsm")}>ITSM</button>
          <button onClick={() => setPage("practice")}>Practice</button>
          <button onClick={() => setPage("interview")}>Interview Prep</button>
        </div>

        <div className="footer-social">
          <h4>Connect</h4>

          <a href="#" target="_blank" rel="noreferrer">
            Instagram
          </a>

          <a href="#" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© 2026 SnowHub By Siva</span>
        <span>Made for ServiceNow Learners </span>
      </div>
    </footer>

<Chatbot />


    </div>
  );
}

export default App;