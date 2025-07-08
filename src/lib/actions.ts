'use server';

import { categorizeExpense as categorizeExpenseFlow } from '@/ai/flows/categorize-expense';
import { z } from 'zod';
import { expenseCategories, type ExpenseCategory } from './types';

const CategorizeSchema = z.object({
  description: z.string(),
});

export async function getCategorySuggestion(
  description: string
): Promise<{ suggestedCategory: ExpenseCategory | null; error?: string }> {
  const parsed = CategorizeSchema.safeParse({ description });

  if (!parsed.success) {
    return { suggestedCategory: null, error: 'Invalid description' };
  }

  if (!parsed.data.description) {
    return { suggestedCategory: null };
  }

  try {
    const result = await categorizeExpenseFlow({ transactionDescription: parsed.data.description });
    
    if (expenseCategories.includes(result.suggestedCategory as ExpenseCategory)) {
      return { suggestedCategory: result.suggestedCategory as ExpenseCategory };
    } else {
      return { suggestedCategory: 'Other' };
    }
  } catch (e) {
    console.error(e);
    return { suggestedCategory: null, error: 'AI categorization failed.' };
  }
}
