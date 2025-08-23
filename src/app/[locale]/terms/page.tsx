import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - FMCB',
  description: 'Terms of Service for Free Methodist Church of Bethlehem',
};

export default function TermsOfServicePage() {
  const t = useTranslations('terms');

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Terms and conditions for using our website and services
            </p>
          </div>
        </Container>
      </section>

      {/* Terms of Service Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-muted-foreground mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    By accessing and using the Free Methodist Church of
                    Bethlehem (FMCB) website, you accept and agree to be bound
                    by the terms and provision of this agreement. If you do not
                    agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  2. Use License
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Permission is granted to temporarily download one copy of
                    the materials on FMCB's website for personal, non-commercial
                    transitory viewing only. This is the grant of a license, not
                    a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Modify or copy the materials</li>
                    <li>
                      Use the materials for any commercial purpose or for any
                      public display (commercial or non-commercial)
                    </li>
                    <li>
                      Attempt to decompile or reverse engineer any software
                      contained on the website
                    </li>
                    <li>
                      Remove any copyright or other proprietary notations from
                      the materials
                    </li>
                  </ul>
                  <p>
                    This license shall automatically terminate if you violate
                    any of these restrictions and may be terminated by FMCB at
                    any time.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  3. Disclaimer
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    The materials on FMCB's website are provided on an 'as is'
                    basis. FMCB makes no warranties, expressed or implied, and
                    hereby disclaims and negates all other warranties including
                    without limitation, implied warranties or conditions of
                    merchantability, fitness for a particular purpose, or
                    non-infringement of intellectual property or other violation
                    of rights.
                  </p>
                  <p>
                    Further, FMCB does not warrant or make any representations
                    concerning the accuracy, likely results, or reliability of
                    the use of the materials on its website or otherwise
                    relating to such materials or on any sites linked to this
                    site.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  4. Limitations
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    In no event shall FMCB or its suppliers be liable for any
                    damages (including, without limitation, damages for loss of
                    data or profit, or due to business interruption) arising out
                    of the use or inability to use the materials on FMCB's
                    website, even if FMCB or an authorized representative has
                    been notified orally or in writing of the possibility of
                    such damage. Because some jurisdictions do not allow
                    limitations on implied warranties, or limitations of
                    liability for consequential or incidental damages, these
                    limitations may not apply to you.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  5. User Conduct
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>When using our website, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use the website only for lawful purposes</li>
                    <li>
                      Not engage in any conduct that restricts or inhibits
                      anyone's use or enjoyment of the website
                    </li>
                    <li>
                      Not transmit any content that is unlawful, harmful,
                      threatening, abusive, harassing, defamatory, vulgar,
                      obscene, or otherwise objectionable
                    </li>
                    <li>
                      Not attempt to gain unauthorized access to any portion of
                      the website
                    </li>
                    <li>
                      Respect the religious nature and mission of our church
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  6. Content Submission
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Any content you submit to our website (including but not
                    limited to comments, prayer requests, or contact form
                    submissions) may be used by FMCB for church-related
                    purposes. By submitting content, you grant FMCB a
                    non-exclusive, royalty-free license to use, reproduce, and
                    distribute such content.
                  </p>
                  <p>
                    You represent that any content you submit is original or
                    that you have the necessary rights to submit it, and that it
                    does not violate any third-party rights.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  7. Privacy
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Your privacy is important to us. Please review our Privacy
                    Policy, which also governs your use of the website, to
                    understand our practices.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  8. Modifications
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    FMCB may revise these terms of service for its website at
                    any time without notice. By using this website, you are
                    agreeing to be bound by the then current version of these
                    terms of service.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  9. Governing Law
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    These terms and conditions are governed by and construed in
                    accordance with the laws of New York State and you
                    irrevocably submit to the exclusive jurisdiction of the
                    courts in that state or location.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  10. Contact Information
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    If you have any questions about these Terms of Service,
                    please contact us:
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
