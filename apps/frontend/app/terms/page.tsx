import type { Metadata } from 'next';
import LegalPage, { LEGAL } from '@/components/legal/LegalPage';

export const metadata: Metadata = { title: 'Terms of Service — Neon' };

const { company, product, email, location, locationAr } = LEGAL;

export default function TermsPage() {
  return (
    <LegalPage
      en={{
        title: 'Terms of Service',
        intro: `These terms govern your use of ${product}, a customer-messaging CRM operated by ${company}, ${location}. By creating an account or using ${product}, you agree to them on behalf of yourself and the business you represent.`,
        sections: [
          {
            heading: 'The service',
            body: [`${product} lets businesses manage WhatsApp conversations, contacts, templates, broadcasts, automations and chatbots through Meta's official WhatsApp Business Platform. Features may change as we improve the product.`],
          },
          {
            heading: 'Your account',
            body: ['You must give accurate information, keep your login details secure, and are responsible for everything done through your workspace, including by team members you invite.'],
          },
          {
            heading: 'WhatsApp and Meta',
            body: [
              `Connecting a WhatsApp number requires a WhatsApp Business account with Meta. You must follow Meta's WhatsApp Business terms, WhatsApp Business Messaging Policy and Commerce Policy. Meta may charge for conversations, restrict or suspend numbers and change its platform; ${product} cannot override those decisions.`,
            ],
          },
          {
            heading: 'Acceptable use',
            body: [
              'You agree not to use the service to:',
              [
                'message people who have not agreed to hear from you, or send spam;',
                'send unlawful, deceptive, harassing or harmful content;',
                'break any law, including privacy, consumer-protection and anti-spam laws;',
                'try to access other workspaces, disrupt the service or reverse-engineer it.',
              ],
              'We may suspend accounts that break these rules or put the service or its users at risk.',
            ],
          },
          {
            heading: 'Your data',
            body: [
              `You own the data you and your customers put into ${product}. You give us permission to process it only to provide the service, as described in our Privacy Policy. You are responsible for having a lawful basis to message your contacts and for telling them how you use their information.`,
            ],
          },
          {
            heading: 'Automated and AI replies',
            body: ['If you turn on the chatbot, you are responsible for its instructions and for the replies it sends on your behalf. AI-generated replies can be wrong; review your settings and monitor conversations.'],
          },
          {
            heading: 'Fees',
            body: ['Paid plans, if any, are billed as agreed when you subscribe. Meta conversation charges are billed by Meta directly to your WhatsApp Business account.'],
          },
          {
            heading: 'Availability and liability',
            body: [
              'We work to keep the service reliable, but it is provided "as is" without warranties of uninterrupted or error-free operation. To the extent the law allows, we are not liable for indirect or consequential losses, lost profits or lost data, and our total liability is limited to the amount you paid us in the 12 months before the claim.',
            ],
          },
          {
            heading: 'Ending the service',
            body: ['You can stop using the service and ask us to close your workspace at any time. We may end or suspend access for breach of these terms. On closure, data is deleted as described in our Privacy Policy.'],
          },
          {
            heading: 'Governing law',
            body: ['These terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates. The courts of Dubai have exclusive jurisdiction over any dispute.'],
          },
          {
            heading: 'Changes',
            body: ['We may update these terms. We will change the date above and notify business customers of significant changes. Continuing to use the service means you accept the updated terms.'],
          },
          {
            heading: 'Contact',
            body: [`Questions about these terms: ${email}`],
          },
        ],
      }}
      ar={{
        title: 'شروط الاستخدام',
        intro: `تنظّم هذه الشروط استخدامك لـ ${product}، نظام إدارة علاقات العملاء للمراسلة الذي تديره ${company}، ${locationAr}. بإنشاء حساب أو استخدام ${product} فإنك توافق عليها نيابةً عنك وعن النشاط التجاري الذي تمثله.`,
        sections: [
          {
            heading: 'الخدمة',
            body: [`يتيح ${product} للشركات إدارة محادثات واتساب وجهات الاتصال والقوالب والحملات والأتمتة والروبوتات عبر منصة واتساب للأعمال الرسمية من Meta. قد تتغير الميزات مع تطوير المنتج.`],
          },
          {
            heading: 'حسابك',
            body: ['يجب أن تقدّم معلومات صحيحة وتحافظ على سرية بيانات الدخول، وأنت مسؤول عن كل ما يتم عبر مساحة عملك بما في ذلك أعضاء الفريق الذين تدعوهم.'],
          },
          {
            heading: 'واتساب وMeta',
            body: [`يتطلب ربط رقم واتساب حساب واتساب للأعمال لدى Meta، ويجب الالتزام بشروط واتساب للأعمال وسياسة المراسلة التجارية وسياسة التجارة. قد تفرض Meta رسومًا على المحادثات أو تقيّد الأرقام أو توقفها أو تغيّر منصتها، ولا يمكن لـ ${product} تجاوز هذه القرارات.`],
          },
          {
            heading: 'الاستخدام المقبول',
            body: [
              'توافق على عدم استخدام الخدمة من أجل:',
              [
                'مراسلة أشخاص لم يوافقوا على التواصل معك، أو إرسال رسائل مزعجة؛',
                'إرسال محتوى مخالف للقانون أو مضلل أو مسيء أو ضار؛',
                'مخالفة أي قانون، بما في ذلك قوانين الخصوصية وحماية المستهلك ومكافحة الرسائل المزعجة؛',
                'محاولة الوصول إلى مساحات عمل أخرى أو تعطيل الخدمة أو الهندسة العكسية لها.',
              ],
              'يحق لنا إيقاف الحسابات التي تخالف هذه القواعد أو تعرّض الخدمة أو مستخدميها للخطر.',
            ],
          },
          {
            heading: 'بياناتك',
            body: [`أنت تملك البيانات التي تضيفها أنت وعملاؤك إلى ${product}، وتمنحنا الإذن بمعالجتها لتقديم الخدمة فقط كما توضح سياسة الخصوصية. وأنت مسؤول عن وجود أساس قانوني لمراسلة جهات اتصالك وإبلاغهم بكيفية استخدام معلوماتهم.`],
          },
          {
            heading: 'الردود التلقائية والذكاء الاصطناعي',
            body: ['إذا فعّلت الروبوت فأنت مسؤول عن تعليماته وعن الردود التي يرسلها نيابةً عنك. قد تكون الردود المولّدة بالذكاء الاصطناعي غير دقيقة، فراجع إعداداتك وتابع المحادثات.'],
          },
          {
            heading: 'الرسوم',
            body: ['تُحتسب الخطط المدفوعة، إن وجدت، كما يُتفق عليه عند الاشتراك. وتُحتسب رسوم محادثات Meta من قِبل Meta مباشرة على حساب واتساب للأعمال الخاص بك.'],
          },
          {
            heading: 'التوفر والمسؤولية',
            body: ['نعمل على أن تكون الخدمة موثوقة، لكنها تُقدَّم "كما هي" دون ضمان عملها دون انقطاع أو أخطاء. وفي الحدود التي يسمح بها القانون، لا نتحمل المسؤولية عن الخسائر غير المباشرة أو التبعية أو الأرباح أو البيانات المفقودة، وتقتصر مسؤوليتنا الإجمالية على ما دفعته لنا خلال الأشهر الاثني عشر السابقة للمطالبة.'],
          },
          {
            heading: 'إنهاء الخدمة',
            body: ['يمكنك التوقف عن استخدام الخدمة وطلب إغلاق مساحة عملك في أي وقت، ويحق لنا إنهاء الوصول أو إيقافه عند مخالفة هذه الشروط. وعند الإغلاق تُحذف البيانات كما توضح سياسة الخصوصية.'],
          },
          {
            heading: 'القانون الواجب التطبيق',
            body: ['تخضع هذه الشروط لقوانين إمارة دبي والقوانين الاتحادية لدولة الإمارات العربية المتحدة، وتختص محاكم دبي حصريًا بالنظر في أي نزاع.'],
          },
          {
            heading: 'التغييرات',
            body: ['قد نحدّث هذه الشروط، وسنغيّر التاريخ أعلاه ونبلغ عملاء الأعمال بالتغييرات الجوهرية. ويعني استمرارك في استخدام الخدمة قبولك للشروط المحدّثة.'],
          },
          {
            heading: 'التواصل',
            body: [`للأسئلة حول هذه الشروط: ${email}`],
          },
        ],
      }}
    />
  );
}
