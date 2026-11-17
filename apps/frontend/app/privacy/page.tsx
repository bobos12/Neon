import type { Metadata } from 'next';
import LegalPage, { LEGAL } from '@/components/legal/LegalPage';

export const metadata: Metadata = { title: 'Privacy Policy — Neon' };

const { company, product, email, location, locationAr } = LEGAL;

export default function PrivacyPage() {
  return (
    <LegalPage
      en={{
        title: 'Privacy Policy',
        intro: `${product} is a customer-messaging CRM operated by ${company}, ${location} ("we", "us"). Businesses use ${product} to talk to their customers on WhatsApp through Meta's official WhatsApp Business Platform. This policy explains what information we handle, why, and the choices you have.`,
        sections: [
          {
            heading: 'Who this applies to',
            body: [
              `Business customers: companies and their team members who sign up for and use ${product}. For their account information, we are the data controller.`,
              `Their customers: people who message a business that uses ${product}. For these conversations the business is the data controller and we process the data only on its behalf and on its instructions.`,
            ],
          },
          {
            heading: 'Information we collect',
            body: [[
              'Account information: name, email address, password (stored hashed), role and workspace settings.',
              'WhatsApp Business account data received from Meta when a business connects its number: business and WhatsApp account IDs, phone number ID, display name, quality rating and an access token (stored encrypted).',
              'Messages and contacts: messages sent and received through the connected WhatsApp number, including media, delivery and read status, and contact details such as name and phone number, plus notes, tags and other CRM data the business adds.',
              'Technical data: log data, device and browser information, and IP address, used to keep the service secure and working.',
            ]],
          },
          {
            heading: 'How we use information',
            body: [[
              'To provide the service: delivering and receiving WhatsApp messages, showing conversations, managing contacts, templates, broadcasts and automations.',
              'To generate automated or AI-assisted replies when a business turns on its chatbot.',
              'To secure accounts, prevent abuse and troubleshoot problems.',
              'To contact business customers about their account and important service changes.',
            ],
            'We do not sell personal information and we do not use message content for advertising.',
            ],
          },
          {
            heading: 'Sharing',
            body: [
              'We share information only as needed to run the service:',
              [
                "Meta Platforms, to send and receive messages through the WhatsApp Business Platform. Meta's own terms and privacy policy apply to its processing.",
                'Infrastructure providers that host our servers, databases and files.',
                'AI service providers, only for businesses that turn on automated replies, to generate responses to incoming messages.',
                'Authorities, when required by law or to protect the rights and safety of people or the service.',
              ],
            ],
          },
          {
            heading: 'Retention',
            body: [
              'We keep account and conversation data for as long as the business keeps its workspace active. When a business deletes data or closes its workspace, we delete it from our active systems within 30 days, and from backups within a further 30 days, unless the law requires us to keep it longer.',
            ],
          },
          {
            heading: 'Security',
            body: [
              'Data is transmitted over encrypted connections. WhatsApp access tokens and other credentials are encrypted at rest, passwords are hashed, and access inside a workspace is limited by role.',
            ],
          },
          {
            heading: 'Your choices and rights',
            body: [
              `You can ask to access, correct or delete your personal information. Business customers can edit or delete most data directly in ${product}. If you messaged a business that uses ${product}, please contact that business first; we will help it respond. See our Data Deletion page for how to request deletion.`,
            ],
          },
          {
            heading: 'Changes',
            body: ['We may update this policy. We will change the date above and, for significant changes, notify business customers in the app or by email.'],
          },
          {
            heading: 'Contact',
            body: [`Questions or requests: ${email}`],
          },
        ],
      }}
      ar={{
        title: 'سياسة الخصوصية',
        intro: `${product} نظام إدارة علاقات العملاء للمراسلة تديره ${company}، ${locationAr} ("نحن"). تستخدم الشركات ${product} للتواصل مع عملائها عبر واتساب من خلال منصة واتساب للأعمال الرسمية من Meta. توضح هذه السياسة المعلومات التي نتعامل معها ولماذا، والخيارات المتاحة لك.`,
        sections: [
          {
            heading: 'على من تنطبق',
            body: [
              `عملاء الأعمال: الشركات وأعضاء فرقها الذين يسجلون في ${product} ويستخدمونه. نحن المسؤولون عن بيانات حساباتهم.`,
              `عملاؤهم: الأشخاص الذين يراسلون شركة تستخدم ${product}. الشركة هي المسؤولة عن هذه المحادثات، ونعالجها نيابةً عنها ووفق تعليماتها فقط.`,
            ],
          },
          {
            heading: 'المعلومات التي نجمعها',
            body: [[
              'بيانات الحساب: الاسم والبريد الإلكتروني وكلمة المرور (محفوظة بشكل مُشفّر أحادي الاتجاه) والدور وإعدادات مساحة العمل.',
              'بيانات حساب واتساب للأعمال التي تصلنا من Meta عند ربط الرقم: معرفات النشاط التجاري وحساب واتساب ورقم الهاتف، والاسم الظاهر، وتقييم الجودة، ورمز وصول محفوظ مشفّرًا.',
              'الرسائل وجهات الاتصال: الرسائل المرسلة والمستلمة عبر الرقم المربوط بما فيها الوسائط وحالة التسليم والقراءة، وبيانات جهات الاتصال كالاسم ورقم الهاتف، والملاحظات والوسوم وغيرها مما تضيفه الشركة.',
              'البيانات التقنية: السجلات ومعلومات الجهاز والمتصفح وعنوان IP، لحماية الخدمة وضمان عملها.',
            ]],
          },
          {
            heading: 'كيف نستخدم المعلومات',
            body: [[
              'لتقديم الخدمة: إرسال واستقبال رسائل واتساب، وعرض المحادثات، وإدارة جهات الاتصال والقوالب والحملات والأتمتة.',
              'لإنشاء ردود تلقائية أو بمساعدة الذكاء الاصطناعي عندما تفعّل الشركة الروبوت.',
              'لحماية الحسابات ومنع إساءة الاستخدام وحل المشكلات.',
              'للتواصل مع عملاء الأعمال بشأن حساباتهم والتغييرات المهمة في الخدمة.',
            ],
            'لا نبيع المعلومات الشخصية ولا نستخدم محتوى الرسائل للإعلانات.',
            ],
          },
          {
            heading: 'المشاركة',
            body: [
              'نشارك المعلومات بالقدر اللازم لتشغيل الخدمة فقط:',
              [
                'شركة Meta، لإرسال واستقبال الرسائل عبر منصة واتساب للأعمال، وتنطبق شروطها وسياسة خصوصيتها على معالجتها.',
                'مزودو البنية التحتية الذين يستضيفون خوادمنا وقواعد البيانات والملفات.',
                'مزودو خدمات الذكاء الاصطناعي، فقط للشركات التي تفعّل الردود التلقائية، لإنشاء الردود على الرسائل الواردة.',
                'الجهات الرسمية، عندما يفرض القانون ذلك أو لحماية حقوق الأشخاص وسلامتهم أو سلامة الخدمة.',
              ],
            ],
          },
          {
            heading: 'مدة الاحتفاظ',
            body: ['نحتفظ ببيانات الحساب والمحادثات طوال فترة نشاط مساحة عمل الشركة. عند حذف الشركة لبياناتها أو إغلاق مساحة عملها نحذفها من أنظمتنا النشطة خلال 30 يومًا ومن النسخ الاحتياطية خلال 30 يومًا إضافية، ما لم يُلزمنا القانون بالاحتفاظ بها مدة أطول.'],
          },
          {
            heading: 'الأمان',
            body: ['تُنقل البيانات عبر اتصالات مشفّرة، وتُحفظ رموز وصول واتساب وبيانات الاعتماد مشفّرة، وكلمات المرور مشفّرة أحادي الاتجاه، والوصول داخل مساحة العمل محدد حسب الدور.'],
          },
          {
            heading: 'خياراتك وحقوقك',
            body: [`يمكنك طلب الاطلاع على معلوماتك الشخصية أو تصحيحها أو حذفها. يمكن لعملاء الأعمال تعديل معظم البيانات أو حذفها مباشرة في ${product}. إذا راسلت شركة تستخدم ${product} فتواصل معها أولًا وسنساعدها في الرد. راجع صفحة حذف البيانات لمعرفة طريقة طلب الحذف.`],
          },
          {
            heading: 'التغييرات',
            body: ['قد نحدّث هذه السياسة، وسنغيّر التاريخ أعلاه ونبلغ عملاء الأعمال بالتغييرات الجوهرية داخل التطبيق أو بالبريد الإلكتروني.'],
          },
          {
            heading: 'التواصل',
            body: [`للأسئلة أو الطلبات: ${email}`],
          },
        ],
      }}
    />
  );
}
