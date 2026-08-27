'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface LeaveRequestFormProps {
  leaveTypes: Array<{ id: string; name: string }>;
  onSubmit: (data: {
    leaveTypeId: string;
    startDate: string;
    endDate: string;
    reason: string;
  }) => Promise<void>;
}

export function LeaveRequestForm({ leaveTypes, onSubmit }: LeaveRequestFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    leaveTypeId: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
    } catch {
      setError('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const leaveTypeOptions = leaveTypes.map((lt) => ({
    value: lt.id,
    label: lt.name,
  }));

  return (
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
            onChange={(e) => setFormData({ ...formData, leaveTypeId: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
            <Input
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Reason (optional)
            </label>
            <textarea
              className="block w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50 transition-colors duration-150"
              rows={4}
              placeholder="Provide a reason for your leave request..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-error-50 p-4 text-sm text-error-600">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-end gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setFormData({
                  leaveTypeId: '',
                  startDate: '',
                  endDate: '',
                  reason: '',
                })
              }
            >
              Clear
            </Button>
            <Button type="submit" loading={loading}>
              Submit Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
