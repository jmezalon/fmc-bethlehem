'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Heart, Smartphone, CreditCard, Shield, Receipt, HelpCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function GivePage() {
  const t = useTranslations('give');

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Container className="py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brandMaroon rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Tithely Section */}
          <section className="bg-white rounded-lg shadow-sm border p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-brandMaroon rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('tithely.title')}
              </h2>
              <p className="text-gray-600">
                {t('tithely.description')}
              </p>
            </div>

            {/* Tithely Embed Placeholder */}
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-brandMaroon rounded-lg flex items-center justify-center mx-auto">
                  <ExternalLink className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('tithely.embedTitle')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('tithely.embedDescription')}
                  </p>
                  <Button 
                    className="bg-brandMaroon hover:bg-brandMaroon/90 text-white"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open('https://tithe.ly/give_new/www/#/tithely/give-one-time/5891075', '_blank');
                      }
                    }}
                  >
                    {t('tithely.giveNow')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Tithely Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {t('tithely.features.recurring')}
                </h4>
                <p className="text-sm text-gray-600">
                  {t('tithely.features.recurringDesc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {t('tithely.features.textGive')}
                </h4>
                <p className="text-sm text-gray-600">
                  {t('tithely.features.textGiveDesc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Receipt className="h-5 w-5 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {t('tithely.features.receipts')}
                </h4>
                <p className="text-sm text-gray-600">
                  {t('tithely.features.receiptsDesc')}
                </p>
              </div>
            </div>

            {/* Text to Give Info */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t('tithely.textToGive.title')}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {t('tithely.textToGive.description')}
                  </p>
                  <div className="bg-white rounded-md px-3 py-2 border">
                    <span className="font-mono text-sm text-gray-900">
                      {t('tithely.textToGive.instructions')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Alternative Methods */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {t('alternatives.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Zelle Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Z</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {t('alternatives.zelle.title')}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t('alternatives.zelle.description')}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">
                      {t('alternatives.zelle.sendTo')}
                    </p>
                    <p className="text-lg font-mono font-semibold text-gray-900">
                      {t('alternatives.zelle.number')}
                    </p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500">
                  {t('alternatives.zelle.note')}
                </p>
              </div>

              {/* Cash App Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">$</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {t('alternatives.cashApp.title')}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t('alternatives.cashApp.description')}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">
                      {t('alternatives.cashApp.sendTo')}
                    </p>
                    <p className="text-lg font-mono font-semibold text-gray-900">
                      {t('alternatives.cashApp.handle')}
                    </p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500">
                  {t('alternatives.cashApp.note')}
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-lg shadow-sm border p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                  <HelpCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('faq.title')}
              </h2>
              <p className="text-gray-600">
                {t('faq.subtitle')}
              </p>
            </div>

            <div className="space-y-6">
              {/* Security FAQ */}
              <div className="border-l-4 border-brandMaroon pl-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-brandMaroon mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {t('faq.security.question')}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('faq.security.answer')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Receipts FAQ */}
              <div className="border-l-4 border-brandMaroon pl-6">
                <div className="flex items-start gap-3">
                  <Receipt className="h-5 w-5 text-brandMaroon mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {t('faq.receipts.question')}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('faq.receipts.answer')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recurring FAQ */}
              <div className="border-l-4 border-brandMaroon pl-6">
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-brandMaroon mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {t('faq.recurring.question')}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('faq.recurring.answer')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact FAQ */}
              <div className="border-l-4 border-brandMaroon pl-6">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-brandMaroon mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {t('faq.contact.question')}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('faq.contact.answer')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Message */}
          <div className="text-center bg-brandMaroon/5 rounded-lg p-8">
            <Heart className="h-8 w-8 text-brandMaroon mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('footer.title')}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('footer.message')}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
