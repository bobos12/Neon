import type { Metadata } from 'next';
import LegalPage, { LEGAL } from '@/components/legal/LegalPage';

export const metadata: Metadata = { title: 'Data Deletion — Neon' };

const { product, email } = LEGAL;

export default function DataDeletionPage() {
  return (
    <LegalPage
      en={{
        title: 'Data Deletion Instructions',
        intro: `You can ask us to delete the personal information ${product} holds about you at any time. Here is how, depending on who you are.`,
        sections: [
          {
            heading: `If you use ${product} for your business`,
            body: [
              'Inside the app, a workspace owner or manager can:',
              [
                'delete individual contacts and their conversations from Contacts;',
                'disconnect the WhatsApp number in Settings → WhatsApp, which deletes the stored Meta access token;',
                'remove team members in Settings → Users.',
              ],
              `To delete your whole account and workspace, email ${email} from the account's email address with the subject "Delete my account".`,
            ],
          },
          {
            heading: `If you messaged a business that uses ${product}`,
            body: [
              `That business controls your conversation data. Ask it to delete your information. You can also email ${email} with your phone number and the name of the business, and we will pass on your request and help it act on it.`,
            ],
          },
          {
            heading: 'If you connected through Facebook',
            body: [
              `You can remove ${product}'s access at any time in Facebook → Settings & privacy → Settings → Business integrations. Then email ${email} with the subject "Delete my data" and we will delete the information we received through Meta.`,
            ],
          },
          {
            heading: 'What happens next',
            body: [
              'We confirm your request by email, may ask you to verify that the account is yours, and delete the data from our active systems within 30 days and from backups within a further 30 days. Information we must keep by law, such as billing records, is kept only for as long as required.',
            ],
          },
        ],
      }}
      ar={{
        title: 'تعليمات حذف البيانات',
        intro: `يمكنك في أي وقت أن تطلب منا حذف المعلومات الشخصية التي يحتفظ بها ${product} عنك. إليك الطريقة حسب حالتك.`,
        sections: [
          {
            heading: `إذا كنت تستخدم ${product} لنشاطك التجاري`,
            body: [
              'من داخل التطبيق يمكن لمالك مساحة العمل أو المدير:',
              [
                'حذف جهات اتصال بعينها مع محادثاتها من صفحة جهات الاتصال؛',
                'فصل رقم واتساب من الإعدادات ← واتساب، مما يحذف رمز وصول Meta المحفوظ؛',
                'إزالة أعضاء الفريق من الإعدادات ← المستخدمون.',
              ],
              `لحذف حسابك ومساحة عملك بالكامل، أرسل بريدًا إلى ${email} من البريد المسجّل في الحساب بعنوان "Delete my account".`,
            ],
          },
          {
            heading: `إذا راسلت شركة تستخدم ${product}`,
            body: [`تتحكم تلك الشركة في بيانات محادثتك، فاطلب منها حذف معلوماتك. ويمكنك أيضًا مراسلتنا على ${email} مع رقم هاتفك واسم الشركة، وسننقل طلبك ونساعدها في تنفيذه.`],
          },
          {
            heading: 'إذا ربطت عبر فيسبوك',
            body: [`يمكنك إلغاء وصول ${product} في أي وقت من فيسبوك ← الإعدادات والخصوصية ← الإعدادات ← تكاملات الأعمال، ثم راسلنا على ${email} بعنوان "Delete my data" وسنحذف المعلومات التي وصلتنا عبر Meta.`],
          },
          {
            heading: 'ماذا يحدث بعد ذلك',
            body: ['نؤكد طلبك بالبريد الإلكتروني، وقد نطلب التحقق من ملكيتك للحساب، ثم نحذف البيانات من أنظمتنا النشطة خلال 30 يومًا ومن النسخ الاحتياطية خلال 30 يومًا إضافية. أما المعلومات التي يُلزمنا القانون بالاحتفاظ بها، كسجلات الفواتير، فنحتفظ بها للمدة المطلوبة فقط.'],
          },
        ],
      }}
    />
  );
}
