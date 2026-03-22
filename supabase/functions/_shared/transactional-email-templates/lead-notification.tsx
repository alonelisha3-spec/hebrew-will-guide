/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'משרד עו"ד אלון אלישע'

interface LeadNotificationProps {
  fullName?: string
  phone?: string
  email?: string
  willType?: string
  riskLevel?: string
  riskItems?: string[]
  answers?: Record<string, string>
  timestamp?: string
}

const LeadNotificationEmail = ({
  fullName = 'לקוח חדש',
  phone = '',
  email = '',
  willType = '',
  riskLevel = '',
  riskItems = [],
  answers = {},
  timestamp = '',
}: LeadNotificationProps) => (
  <Html lang="he" dir="rtl">
    <Head />
    <Preview>פנייה חדשה מבדיקת צוואה חכמה – {fullName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>פנייה חדשה מבדיקת צוואה</Heading>
        <Hr style={hr} />

        <Section style={detailSection}>
          <Text style={label}>שם מלא</Text>
          <Text style={value}>{fullName}</Text>
        </Section>

        <Section style={detailSection}>
          <Text style={label}>טלפון</Text>
          <Text style={value}>{phone}</Text>
        </Section>

        {email && (
          <Section style={detailSection}>
            <Text style={label}>דוא״ל</Text>
            <Text style={value}>{email}</Text>
          </Section>
        )}

        <Hr style={hr} />

        {willType && (
          <Section style={detailSection}>
            <Text style={label}>סוג בדיקה</Text>
            <Text style={value}>{willType}</Text>
          </Section>
        )}

        {riskLevel && (
          <Section style={detailSection}>
            <Text style={label}>רמת סיכון</Text>
            <Text style={riskLevelStyle}>{riskLevel}</Text>
          </Section>
        )}

        {riskItems.length > 0 && (
          <Section style={detailSection}>
            <Text style={label}>נושאים שזוהו</Text>
            {riskItems.map((item, i) => (
              <Text key={i} style={bulletItem}>• {item}</Text>
            ))}
          </Section>
        )}

        {Object.keys(answers).length > 0 && (
          <>
            <Hr style={hr} />
            <Text style={label}>תשובות מלאות</Text>
            {Object.entries(answers).map(([q, a]) => (
              <Text key={q} style={answerItem}>{q}: {a}</Text>
            ))}
          </>
        )}

        <Hr style={hr} />
        <Text style={footer}>
          {timestamp || new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: LeadNotificationEmail,
  subject: (data: Record<string, any>) => `פנייה חדשה | ${data.fullName || 'לקוח'} | בדיקת צוואה`,
  to: 'alonelisha3@gmail.com',
  displayName: 'התראת ליד חדש',
  previewData: {
    fullName: 'ישראל כהן',
    phone: '054-1234567',
    email: 'israel@example.com',
    willType: 'צוואה הדדית',
    riskLevel: 'גבוהה',
    riskItems: ['קיים סיכון למחלוקת בין יורשים', 'נדרש טיפול בנכסים דיגיטליים'],
    answers: { 'האם קיימת כיום צוואה?': 'כן, צוואה הדדית' },
    timestamp: '22/03/2026, 18:30',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '600px', margin: '0 auto' }
const h1 = { fontSize: '20px', fontWeight: 'bold' as const, color: '#1a2332', margin: '0 0 16px', textAlign: 'right' as const }
const hr = { borderColor: '#e5e5e5', margin: '16px 0' }
const detailSection = { marginBottom: '8px', textAlign: 'right' as const }
const label = { fontSize: '12px', color: '#888888', margin: '0 0 2px', textAlign: 'right' as const }
const value = { fontSize: '15px', color: '#1a2332', margin: '0 0 8px', textAlign: 'right' as const }
const riskLevelStyle = { fontSize: '15px', color: '#b45309', fontWeight: 'bold' as const, margin: '0 0 8px', textAlign: 'right' as const }
const bulletItem = { fontSize: '14px', color: '#374151', margin: '2px 0', textAlign: 'right' as const }
const answerItem = { fontSize: '13px', color: '#555555', margin: '2px 0', textAlign: 'right' as const }
const footer = { fontSize: '11px', color: '#999999', textAlign: 'right' as const, margin: '8px 0 0' }
