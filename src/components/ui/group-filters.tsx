'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Filter, X } from 'lucide-react';

interface GroupFiltersProps {
  onFiltersChange: (filters: GroupFilters) => void;
  availableFilters: {
    daysOfWeek: string[];
    languages: string[];
    lifeStages: string[];
  };
}

export interface GroupFilters {
  dayOfWeek: string;
  language: string;
  lifeStage: string;
}

export function GroupFilters({
  onFiltersChange,
  availableFilters,
}: GroupFiltersProps) {
  const t = useTranslations('groups.filters');

  const [filters, setFilters] = useState<GroupFilters>({
    dayOfWeek: '',
    language: '',
    lifeStage: '',
  });

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: keyof GroupFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      dayOfWeek: '',
      language: '',
      lifeStage: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{t('title')}</span>
          {hasActiveFilters && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              {Object.values(filters).filter(v => v !== '').length}
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
            {t('clearAll')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Day of Week Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {t('dayOfWeek')}
          </label>
          <select
            value={filters.dayOfWeek}
            onChange={e => handleFilterChange('dayOfWeek', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">{t('allDays')}</option>
            {availableFilters.daysOfWeek.map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {t('language')}
          </label>
          <select
            value={filters.language}
            onChange={e => handleFilterChange('language', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">{t('allLanguages')}</option>
            {availableFilters.languages.map(language => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* Life Stage Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {t('lifeStage')}
          </label>
          <select
            value={filters.lifeStage}
            onChange={e => handleFilterChange('lifeStage', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">{t('allLifeStages')}</option>
            {availableFilters.lifeStages.map(stage => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
