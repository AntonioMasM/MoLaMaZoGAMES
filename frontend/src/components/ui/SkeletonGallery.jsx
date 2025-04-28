import styles from "./SkeletonGallery.module.css";

const SkeletonGallery = ({ count = 6 }) => {
  const skeletons = Array.from({ length: count });

  return (
    <section className={styles.skeletonGallery}>
      {skeletons.map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <div className={styles.skeletonImage}></div>
          <div className={styles.skeletonTitle}></div>
        </div>
      ))}
    </section>
  );
};

export default SkeletonGallery;
