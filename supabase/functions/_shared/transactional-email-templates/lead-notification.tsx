import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "משרד עו\"ד אלון אלישע"

interface LeadNotificationProps {
  fullName?: string
  phone?: string
  email?: string
  willType?: string
  riskLevel?: string
  riskItems?: string[]
  answers?: Record<string, string>
  fullDraft?: string
  ctaTag?: string
  timestamp?: string
}

const CTA_LABELS: Record<string, string> = {
  purchase: '🔥 רוצה לרכוש צוואה שלמה ב-500 ₪ (ליד חם)',
  callback: '📞 מעוניין — מבקש חזרה טלפונית (ליד חם)',
  draft_only: '📄 נשאר עם הטיוטה בלבד (ליד קר)',
}

const LeadNotificationEmail = ({
  fullName = '',
  phone = '',
  email = '',
  willType = '',
  riskLevel = '',
  riskItems = [],
  answers = {},
  fullDraft = '',
  ctaTag = '',
  timestamp = '',
}: LeadNotificationProps) => (
  <Html lang="he" dir="rtl">
    <Head />
    <Preview>ליד חדש — {fullName} — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>ליד חדש מהמערכת</Heading>
        <Text style={text}><strong>שם:</strong> {fullName}</Text>
        <Text style={text}><strong>טלפון:</strong> {phone}</Text>
        {email ? <Text style={text}><strong>דוא״ל:</strong> {email}</Text> : null}
        {willType ? <Text style={text}><strong>סוג צוואה:</strong> {willType}</Text> : null}
        {riskLevel ? <Text style={text}><strong>רמת סיכון:</strong> {riskLevel}</Text> : null}
        {timestamp ? <Text style={text}><strong>זמן:</strong> {timestamp}</Text> : null}

        {riskItems.length > 0 ? (
          <Section>
            <Hr style={hr} />
            <Heading style={h2}>ממצאים</Heading>
            {riskItems.map((item: string, i: number) => (
              <Text key={i} style={text}>• {item}</Text>
            ))}
          </Section>
        ) : null}

        {Object.keys(answers).length > 0 ? (
          <Section>
            <Hr style={hr} />
            <Heading style={h2}>תשובות</Heading>
            {Object.entries(answers).map(([key, value]: [string, string]) => (
              <Text key={key} style={text}><strong>{key}:</strong> {value}</Text>
            ))}
          </Section>
        ) : null}

        {fullDraft ? (
          <Section>
            <Hr style={hr} />
            <Heading style={h2}>טיוטת צוואה שנוצרה</Heading>
            <Text style={draftStyle}>{fullDraft}</Text>
          </Section>
        ) : null}

        <Hr style={hr} />
        <Text style={footer}>{SITE_NAME} — מערכת טיוטת צוואה</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: LeadNotificationEmail,
  subject: (data: Record<string, any>) => `ליד חדש — ${data.fullName || 'לא צוין'}`,
  displayName: 'התראת ליד חדש',
  to: 'alonelisha3@gmail.com',
  previewData: {
    fullName: 'ישראל ישראלי',
    phone: '054-1234567',
    email: 'test@example.com',
    willType: 'צוואה רגילה',
    riskLevel: 'בינונית',
    riskItems: ['נדרשת התייחסות לילדים קטינים'],
    answers: { familyStatus: 'נשוי/אה' },
    fullDraft: 'צ ו ו א ה\n\n(נוסח ראשוני)',
    timestamp: '22/03/2026, 12:00',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '20px 25px', direction: 'rtl' as const }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1a2332', margin: '0 0 20px' }
const h2 = { fontSize: '16px', fontWeight: 'bold' as const, color: '#1a2332', margin: '15px 0 10px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.6', margin: '0 0 8px' }
const draftStyle = { fontSize: '12px', color: '#333', lineHeight: '1.8', margin: '0 0 8px', whiteSpace: 'pre-wrap' as const, fontFamily: 'monospace, Arial, sans-serif' }
const hr = { borderColor: '#e5e5e5', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#999', margin: '20px 0 0' }
