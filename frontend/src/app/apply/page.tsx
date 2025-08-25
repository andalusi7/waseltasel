'use client';
import { useState, FormEvent } from 'react';
import PagesIntro from '@/components/pages-intro';
import { Separator } from '@/components/ui/separator';

const ApplyPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: '',
    cv: null as File | null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, cv: file }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.cv) {
      setMessage('❌ الرجاء رفع ملف السي في.');
      return;
    }

    const uploadForm = new FormData();

    uploadForm.append(
      'data',
      JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        coverLetter: formData.coverLetter,
        submittedAt: new Date().toISOString(),
      })
    );

    // اسم المفتاح هنا "files.cv" يجب أن يطابق اسم الحقل Media في Strapi
    uploadForm.append('files.cv', formData.cv, formData.cv.name);

    try {
      const res = await fetch('https://cms.waseltasel.org/api/job-applications', {
        method: 'POST',
        body: uploadForm,
        // لا تضف Content-Type هنا، المتصفح يحددها تلقائياً عند استخدام FormData
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('✅ تم إرسال الطلب بنجاح');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          position: '',
          coverLetter: '',
          cv: null,
        });
      } else {
        setMessage('❌ خطأ: ' + (result.error?.message || 'حدث خطأ'));
      }
    } catch {
      setMessage('❌ حدث خطأ في الإرسال');
    }
  };

  return (
    <div>
      <PagesIntro backgroundUrl="./jobs_bg.png" title="التقديم على الوظائف" />

      <div className="pt-24 pb-14 px-4 container mx-auto max-w-xl">
        <h1 className="text-3xl font-bold text-[#FF6600] mb-8 text-center">
          نموذج التقديم على الوظيفة
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="fullName"
            type="text"
            placeholder="الاسم الكامل"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="email"
            type="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="phone"
            type="text"
            placeholder="رقم الهاتف"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">اختر الوظيفة</option>
            <option value="محاسب">محاسب</option>
            <option value="مبرمج">مبرمج</option>
            <option value="مدير مشروع">مدير مشروع</option>
          </select>
          <textarea
            name="coverLetter"
            placeholder="رسالة تعريفية"
            value={formData.coverLetter}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="cv"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full"
            required
          />
          <button
            type="submit"
            className="bg-[#FF6600] hover:bg-[#d55718] text-white font-bold w-full py-3 rounded"
          >
            إرسال
          </button>
        </form>

        {message && (
          <>
            <Separator className="my-8" />
            <p className="text-center text-lg">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
