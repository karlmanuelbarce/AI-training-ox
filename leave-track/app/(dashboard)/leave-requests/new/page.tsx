'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import type { CreateLeaveRequestInput } from '@/types';

interface ValidationErrors {
  leaveTypeId?: string;
  startDate?: string;
  endDate?: string;
  reason?: string;
}

export default function NewLeaveRequestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [leaveTypeOptions, setLeaveTypeOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  const [formData, setFormData] = useState<CreateLeaveRequestInput>({
    leaveTypeId: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  useEffect(() => {
    fetch('/api/leave-requests')
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setLeaveTypeOptions(
            result.data.map((lt: { id: string; name: string }) => ({
              value: lt.id,
              label: lt.name,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.leaveTypeId) {
      errors.leaveTypeId = 'Please select a leave type';
    }

    if (!formData.startDate) {
      errors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      errors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (endDate < startDate) {
        errors.endDate = 'End date cannot be before start date';
      }
    }

    if (formData.reason.length > 500) {
      errors.reason = 'Reason must be 500 characters or less';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setWarning('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/leave-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error.message);
        return;
      }

      if (result.data.warning) {
        setWarning(result.data.warning);
        return;
      }

      router.push('/leave-requests');
    } catch {
      setError('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Submit Leave Request</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Fill out the form below to submit a new leave request.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-neutral-900">Request Details</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Select
              label="Leave Type"
              options={leaveTypeOptions}
              placeholder="Select leave type"
              value={formData.leaveTypeId}
              onChange={(e) =>
                setFormData({ ...formData, leaveTypeId: e.target.value })
              }
              error={validationErrors.leaveTypeId}
              required
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                error={validationErrors.startDate}
                required
              />
              <Input
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                error={validationErrors.endDate}
                required
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Reason (optional)
              </label>
              <textarea
                id="reason"
                className="block w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50 transition-colors duration-150"
                rows={4}
                placeholder="Provide a reason for your leave request..."
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                maxLength={500}
              />
              {validationErrors.reason && (
                <p className="mt-1.5 text-sm text-error-600">{validationErrors.reason}</p>
              )}
              <p className="mt-1.5 text-sm text-neutral-500">
                {formData.reason.length}/500 characters
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-error-50 p-4 text-sm text-error-600">
                <AlertCircle className="h-5 w-5" />
                {error}
              </div>
            )}

            {warning && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 rounded-lg bg-warning-50 p-4 text-sm text-warning-500">
                  <AlertTriangle className="h-5 w-5" />
                  {warning}
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push('/leave-requests')}
                >
                  View My Requests
                </Button>
              </div>
            )}

            <div className="flex items-center justify-end gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" loading={loading}>
                Submit Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
