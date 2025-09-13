'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/container';
import { GroupCard } from '@/components/ui/group-card';
import {
  GroupFilters,
  type GroupFilters as GroupFiltersType,
} from '@/components/ui/group-filters';
import { Users, Search } from 'lucide-react';

// Groups data will be fetched from API

export default function GroupsPage() {
  const t = useTranslations('groups');
  const locale = useLocale() as 'en' | 'ht' | 'fr';
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<GroupFiltersType>({
    dayOfWeek: '',
    language: '',
    lifeStage: '',
  });
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('/api/groups');
        const groupsData = await response.json();
        setGroups(groupsData);
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // Get available filter options
  const availableFilters = useMemo(() => {
    const daysOfWeek = Array.from(
      new Set(groups.map(group => group.dayOfWeek))
    );
    const languages = Array.from(
      new Set(groups.map(group => group.language))
    );
    const lifeStages = Array.from(
      new Set(groups.map(group => group.lifeStage))
    );

    return { daysOfWeek, languages, lifeStages };
  }, [groups]);

  // Filter groups based on search and filters
  const filteredGroups = useMemo(() => {
    return groups.filter(group => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesName = group.name[locale]
          .toLowerCase()
          .includes(searchLower);
        const matchesDescription = group.description[locale]
          .toLowerCase()
          .includes(searchLower);
        const matchesLeader = group.leader[locale]
          .toLowerCase()
          .includes(searchLower);

        if (!matchesName && !matchesDescription && !matchesLeader) {
          return false;
        }
      }

      // Day of week filter
      if (filters.dayOfWeek && group.dayOfWeek !== filters.dayOfWeek) {
        return false;
      }

      // Language filter
      if (filters.language && group.language !== filters.language) {
        return false;
      }

      // Life stage filter
      if (filters.lifeStage && group.lifeStage !== filters.lifeStage) {
        return false;
      }

      return true;
    });
  }, [groups, searchTerm, filters, locale]);

  // Sort groups by day of week and time
  const sortedGroups = useMemo(() => {
    const dayOrder = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    return [...filteredGroups].sort((a, b) => {
      const dayA = dayOrder.indexOf(a.dayOfWeek);
      const dayB = dayOrder.indexOf(b.dayOfWeek);

      if (dayA !== dayB) {
        return dayA - dayB;
      }

      // If same day, sort by time
      return a.time.localeCompare(b.time);
    });
  }, [filteredGroups]);

  if (loading) {
    return (
      <main>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading groups...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b bg-muted/30">
        <Container>
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <GroupFilters
              onFiltersChange={setFilters}
              availableFilters={availableFilters}
            />
          </div>
        </Container>
      </section>

      {/* Groups Grid */}
      <section className="py-16">
        <Container>
          <div className="space-y-8">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {t('available')}
              </h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">
                  {t('groupCount', { count: sortedGroups.length })}
                </span>
              </div>
            </div>

            {/* Groups List */}
            {sortedGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedGroups.map(group => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('noGroups.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('noGroups.description')}
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({
                        dayOfWeek: '',
                        language: '',
                        lifeStage: '',
                      });
                    }}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    {t('noGroups.clearFilters')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-muted-foreground mb-8">{t('cta.description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:methodistchurch1993@gmail.com?subject=New Group Interest"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
              >
                {t('cta.startGroup')}
              </a>
              <a
                href="mailto:methodistchurch1993@gmail.com?subject=Group Questions"
                className="inline-flex items-center gap-2 border border-input bg-background px-6 py-3 rounded-md font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {t('cta.questions')}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
