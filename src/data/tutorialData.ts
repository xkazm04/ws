import React from 'react'
// Introduction imports
import introMd from './introduction/intro.md'
// Credentials imports
import emailMd from './credentials/email.md'
import geminiMd from './credentials/gemini.md'
import credentialsMd from './credentials/credentials.md'
import credentialsAsanaMd from './credentials/asana.md'
// Workflow imports
import gmailMd from './workflow/gmail.md'
import aiAgentMd from './workflow/ai-agent.md'
import conditionalMd from './workflow/conditional.md'
import workflowAsanaMd from './workflow/asana.md'
// Optional imports
import toolsMd from './optional/tools.md'
import asanaDetailMd from './optional/asanaDetail.md'

export interface Chapter {
  id: string
  title: string
  completed: boolean
  content: string
}

export interface Category {
  id: string
  title: string
  chapters: Chapter[]
}

export interface Tutorial {
  title: string
  description: string | React.ReactNode
  categories: Category[]
}

export const tutorialData: Tutorial = {
  title: "n8n workflow",
  description: "This tutorial will guide you through creating an automated workflow with n8n, covering Gmail integration, AI agents, email states, and powerful tools.",
  categories: [
    {
      id: "introduction",
      title: "INTRODUCTION",
      chapters: [
        {
          id: "intro",
          title: "Getting Started",
          completed: false,
          content: introMd
        }
      ]
    },
    {
      id: "credentials",
      title: "CREDENTIALS",
      chapters: [
        {
          id: "credentials",
          title: "Credential Setup",
          completed: false,
          content: credentialsMd
        },
        {
          id: "email",
          title: "Email Setup",
          completed: false,
          content: emailMd
        },
        {
          id: "gemini",
          title: "Gemini API",
          completed: false,
          content: geminiMd
        },
        {
          id: "credentials-asana",
          title: "Asana Setup",
          completed: false,
          content: credentialsAsanaMd
        }
      ]
    },
    {
      id: "workflow",
      title: "WORKFLOW",
      chapters: [
        {
          id: "gmail",
          title: "Gmail integration",
          completed: false,
          content: gmailMd
        },
        {
          id: "ai-agent",
          title: "AI Agent",
          completed: false,
          content: aiAgentMd
        },
        {
          id: "conditional",
          title: "Conditional logic",
          completed: false,
          content: conditionalMd
        },
        {
          id: "workflow-asana",
          title: "Asana integration",
          completed: false,
          content: workflowAsanaMd
        },
        {
          id: "tools",
          title: "Optional: Tools for AI",
          completed: false,
          content: toolsMd
        }
      ]
    },
    {
      id: "optional",
      title: "OPTIONAL CONTENT",
      chapters: [
        {
          id: "tools",
          title: "Optional: Tool for AI",
          completed: false,
          content: toolsMd
        },
        {
          id: "asana-detail",
          title: "Asana metadata",
          completed: false,
          content: asanaDetailMd
        }
      ]
    }
  ]
}