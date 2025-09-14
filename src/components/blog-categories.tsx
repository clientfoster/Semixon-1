'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Tag } from 'lucide-react';
import { BlogCategory } from '@/lib/types';

interface BlogCategoriesProps {
  categories: BlogCategory[];
}

export function BlogCategories({ categories }: BlogCategoriesProps) {
  if (categories.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="text-muted-foreground">
            <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No categories available</p>
            <p className="text-sm">Categories will appear here when they are created.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: category.color }}
              />
              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                {category.name}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {category.description && (
              <p className="text-slate-600 line-clamp-2 mb-4 text-sm">
                {category.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
              </Badge>

              <Button asChild variant="ghost" size="sm" className="group-hover:text-blue-600 transition-colors">
                <Link href={`/blog/category/${category.slug}`}>
                  View Posts
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
