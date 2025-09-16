// components/CourseDetails/CourseDetailsComponent.jsx
import React from 'react';
import Image from 'next/image'; // برای بهینه‌سازی عکس‌ها در Next.js

// می‌توانید استایل‌های CSS را از فایل CourseDetails.module.css وارد کنید
import styles from './CourseDetails.module.css'; 

export default function CourseDetailsComponent({ course }) {
  if (!course) {
    return <div>داده‌های دوره موجود نیست.</div>;
  }

  // اطمینان حاصل کنید که آدرس عکس کامل و قابل دسترسی است
  // اگر عکس‌ها در پوشه public/uploads هستند، آدرس از ریشه public شروع می‌شود
  // مثال: اگر course.image = "/uploads/courses/1.jpg"
  // و این عکس در public/uploads/courses/1.jpg قرار دارد، همین آدرس درست است.
  const imageUrl = course.image; // فرض می‌کنیم course.image آدرس کامل را دارد

  return (
    <div className={styles.courseDetailsContainer}>
      {imageUrl && ( // اگر imageUrl وجود داشت، عکس را نمایش بده
        <div className={styles.courseImageWrapper}>
          <Image
            src={imageUrl}
            alt={course.title}
            width={600} // عرض دلخواه
            height={400} // ارتفاع دلخواه (می‌توانید objectFit="cover" را اضافه کنید)
            layout="responsive" // برای ریسپانسیو بودن عکس
            objectFit="cover" // برای پر کردن فضا بدون تغییر نسبت تصویر
            className={styles.courseImage}
            unoptimized={true} // اگر با بهینه‌سازی Next.js مشکل داشتید، موقتاً غیرفعال کنید
          />
        </div>
      )}

      <h1 className={styles.courseTitle}>{course.title}</h1>
      <p className={styles.courseDescription}>{course.description}</p>
      
      <div className={styles.courseMeta}>
        <p><strong>Category:</strong> {course.category}</p>
        <p><strong>Level:</strong> {course.level}</p>
        <p><strong>Duration:</strong> {course.duration} hours</p>
        <p><strong>Price:</strong> {course.price === 0 ? 'Free' : `$${course.price}`}</p>
        <p><strong>Status:</strong> {course.status}</p>
      </div>

      {/* می‌توانید اطلاعات بیشتری مانند نام مدرس را در اینجا نمایش دهید */}
      {/* <p><strong>Created By:</strong> {course.created_by_name}</p> */}
      {/* برای نمایش نام مدرس، باید اطلاعات مدرس را هم از بک‌اند دریافت کنید */}
      
    </div>
  );
}