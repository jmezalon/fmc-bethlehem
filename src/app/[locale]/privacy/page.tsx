import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - FMCB',
  description: 'Privacy Policy for Free Methodist Church of Bethlehem',
};

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacy');

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              How we collect, use, and protect your personal information
            </p>
          </div>
        </Container>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-muted-foreground mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  1. Information We Collect
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We may collect the following types of information when you
                    visit our website or interact with our services:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Personal Information:</strong> Name, email
                      address, phone number, and mailing address when you
                      voluntarily provide it through contact forms, newsletter
                      subscriptions, or event registrations.
                    </li>
                    <li>
                      <strong>Usage Information:</strong> Information about how
                      you use our website, including pages visited, time spent
                      on pages, and navigation patterns.
                    </li>
                    <li>
                      <strong>Technical Information:</strong> IP address,
                      browser type, device information, and other technical data
                      collected automatically.
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  2. How We Use Your Information
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We use the information we collect for the following
                    purposes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      To respond to your inquiries and provide requested
                      information
                    </li>
                    <li>
                      To send newsletters and updates about church events and
                      activities
                    </li>
                    <li>To improve our website and services</li>
                    <li>
                      To communicate with you about church-related matters
                    </li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  3. Information Sharing
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties without your consent, except in
                    the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      When required by law or to comply with legal processes
                    </li>
                    <li>
                      To protect our rights, property, or safety, or that of our
                      members and visitors
                    </li>
                    <li>
                      With trusted service providers who assist us in operating
                      our website or conducting church business, provided they
                      agree to keep information confidential
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  4. Data Security
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We implement appropriate security measures to protect your
                    personal information against unauthorized access,
                    alteration, disclosure, or destruction. However, no method
                    of transmission over the internet or electronic storage is
                    100% secure.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  5. Cookies and Tracking
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our website may use cookies and similar tracking
                    technologies to enhance your browsing experience. You can
                    control cookie settings through your browser preferences.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  6. Your Rights
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Object to certain processing of your information</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  7. Children's Privacy
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our website is not directed to children under 13. We do not
                    knowingly collect personal information from children under
                    13. If we become aware that we have collected such
                    information, we will take steps to delete it.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  8. Changes to This Policy
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Last updated" date.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  9. Contact Us
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    If you have any questions about this Privacy Policy or our
                    data practices, please contact us:
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p>
                      <strong>Free Methodist Church of Bethlehem</strong>
                    </p>
                    <p>4415 Glenwood Road</p>
                    <p>Brooklyn, NY 11203</p>
                    <p>Phone: (929) 343-9393</p>
                    <p>Email: methodistchurch1993@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
