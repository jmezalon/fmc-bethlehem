'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Filter, X } from 'lucide-react';

interface SermonFiltersProps {
  onFiltersChange: (filters: SermonFilters) => void;
  availableFilters: {
    series: string[];
    topics: string[];
    languages: string[];
    speakers: string[];
    years: number[];
  };
}

export interface SermonFilters {
  search: string;
  series: string;
  topic: string;
  language: string;
  speaker: string;
  year: string;
}

export function SermonFilters({
  onFiltersChange,
  availableFilters,
}: SermonFiltersProps) {
  const t = useTranslations('watchPages.sermons.filters');

  const [filters, setFilters] = useState<SermonFilters>({
    search: '',
    series: '',
    topic: '',
    language: '',
    speaker: '',
    year: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: keyof SermonFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      series: '',
      topic: '',
      language: '',
      speaker: '',
      year: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={filters.search}
          onChange={e => handleFilterChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 border border-input rounded-md transition-colors ${
            showFilters 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-background hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          <Filter className="h-4 w-4" />
          {showFilters ? t('hideFilters') : t('showFilters')}
          {hasActiveFilters && (
            <span className="bg-background text-foreground text-xs px-2 py-0.5 rounded-full ml-2">
              {Object.values(filters).filter(v => v !== '').length}
            </span>
          )}
        </button>

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

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 border border-input rounded-lg bg-muted/30">
          {/* Series Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('series')}
            </label>
            <select
              value={filters.series}
              onChange={e => handleFilterChange('series', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">{t('allSeries')}</option>
              {availableFilters.series.map(series => (
                <option key={series} value={series}>
                  {series}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('topic')}
            </label>
            <select
              value={filters.topic}
              onChange={e => handleFilterChange('topic', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">{t('allTopics')}</option>
              {availableFilters.topics.map(topic => (
                <option key={topic} value={topic}>
                  {topic}
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

          {/* Speaker Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('speaker')}
            </label>
            <select
              value={filters.speaker}
              onChange={e => handleFilterChange('speaker', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">{t('allSpeakers')}</option>
              {availableFilters.speakers.map(speaker => (
                <option key={speaker} value={speaker}>
                  {speaker}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('year')}
            </label>
            <select
              value={filters.year}
              onChange={e => handleFilterChange('year', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">{t('allYears')}</option>
              {availableFilters.years.map(year => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
