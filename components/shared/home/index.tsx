import Head from "@/components/shared/home/head";
import BlogPosts from "@/components/shared/home/blog-posts";
import CategooriesGrid from "@/components/shared/home/categories-grid";
import FeaturedProducts from "@/components/shared/home/featured-products";
import NewsletterSubscribe from "@/components/shared/home/newsletter-subscribe";

const Home = () => {
  return (
    <>
      <Head />
      <CategooriesGrid />
      <FeaturedProducts />
      <BlogPosts />
      <NewsletterSubscribe />
    </>
  );
};

export default Home;
