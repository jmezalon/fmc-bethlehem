'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Calendar, Clock, Users, Globe, Mail, MapPin } from 'lucide-react';

interface GroupCardProps {
  group: {
    id: string;
    name: {
      en: string;
      ht: string;
      fr: string;
    };
    description: {
      en: string;
      ht: string;
      fr: string;
    };
    dayOfWeek: string;
    time: string;
    language: string;
    lifeStage: string;
    location: {
      en: string;
      ht: string;
      fr: string;
    };
    contactEmail: string;
    leader: {
      en: string;
      ht: string;
      fr: string;
    };
    capacity?: number;
    currentMembers?: number;
  };
}

export function GroupCard({ group }: GroupCardProps) {
  const t = useTranslations('groups');
  const locale = useLocale() as 'en' | 'ht' | 'fr';

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString(locale === 'en' ? 'en-US' : locale === 'fr' ? 'fr-FR' : 'en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCapacityStatus = () => {
    if (!group.capacity || !group.currentMembers) return null;
    const percentage = (group.currentMembers / group.capacity) * 100;
    if (percentage >= 90) return 'full';
    if (percentage >= 75) return 'filling';
    return 'open';
  };

  const capacityStatus = getCapacityStatus();

  return (
    <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {group.name[locale]}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {group.lifeStage}
                </span>
                {capacityStatus && (
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    capacityStatus === 'full' 
                      ? 'bg-red-100 text-red-700' 
                      : capacityStatus === 'filling'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {capacityStatus === 'full' ? t('status.full') : 
                     capacityStatus === 'filling' ? t('status.filling') : 
                     t('status.open')}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2">
            {group.description[locale]}
          </p>
        </div>

        {/* Group Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{group.dayOfWeek}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatTime(group.time)}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>{group.language}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{group.location[locale]}</span>
          </div>

          {group.capacity && group.currentMembers && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{group.currentMembers}/{group.capacity} {t('members')}</span>
            </div>
          )}
        </div>

        {/* Leader & Contact */}
        <div className="pt-4 border-t border-border space-y-3">
          <div className="text-sm">
            <span className="font-medium text-foreground">{t('leader')}: </span>
            <span className="text-muted-foreground">{group.leader[locale]}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a 
              href={`mailto:${group.contactEmail}`}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {group.contactEmail}
            </a>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <a
            href={`mailto:${group.contactEmail}?subject=${encodeURIComponent(`Interest in ${group.name[locale]}`)}&body=${encodeURIComponent(`Hi, I'm interested in learning more about the ${group.name[locale]} group. Could you please provide more information about joining?`)}`}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
              capacityStatus === 'full'
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            <Mail className="h-4 w-4" />
            {capacityStatus === 'full' ? t('actions.waitlist') : t('actions.contact')}
          </a>
        </div>
      </div>
    </div>
  );
}
