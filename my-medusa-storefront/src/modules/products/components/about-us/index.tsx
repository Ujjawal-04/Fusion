'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion'
import { ChevronRight, ShoppingBag, Truck, HeartHandshake, Sparkles, Zap, Recycle, Shield, Award } from 'lucide-react'

const features = [
  { icon: ShoppingBag, title: "Extensive Collection", description: "From casual to formal, find the perfect pair for every occasion.", color: "from-blue-500 to-cyan-500" },
  { icon: Truck, title: "Fast & Free Shipping", description: "Enjoy complimentary shipping on all orders over $100.", color: "from-green-500 to-emerald-500" },
  { icon: HeartHandshake, title: "30-Day Returns", description: "Not satisfied? Return your shoes within 30 days, no questions asked.", color: "from-yellow-500 to-amber-500" },
  { icon: Sparkles, title: "Exclusive Designs", description: "Discover unique styles you won't find anywhere else.", color: "from-red-500 to-rose-500" },
  { icon: Zap, title: "Smart Fit Technology", description: "Our AI-powered size recommendation ensures the perfect fit.", color: "from-purple-500 to-indigo-500" },
  { icon: Recycle, title: "Eco-Friendly Materials", description: "Sustainable shoes that look good and feel good.", color: "from-teal-500 to-green-500" },
  { icon: Shield, title: "Quality Guarantee", description: "We stand behind our products with a lifetime quality guarantee.", color: "from-orange-500 to-amber-500" },
  { icon: Award, title: "Award-Winning Comfort", description: "Experience unparalleled comfort with our patented sole technology.", color: "from-pink-500 to-rose-500" },
]

const photos = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
  "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
  "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
  "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1998&q=80",
  "/placeholder.svg?height=600&width=600",
  "/placeholder.svg?height=600&width=600",
]

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: -90 },
            visible: { 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
              }
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}


const ParallaxText = ({ children, baseVelocity=1000 }: { children: React.ReactNode; baseVelocity: number }) => {
  const baseX = useMotionValue(0);
  const containerWidth = useRef<number>(0);
  const textWidth = useRef<number>(0);

  
  const updateContainerWidth = (node: HTMLElement | null) => {
    if (node) {
      containerWidth.current = node.offsetWidth;  
      textWidth.current = node.scrollWidth; 
    }
  };
  useAnimationFrame((t, delta) => {
  
    let moveBy = baseVelocity * (delta / 80);

    baseX.set(baseX.get() + moveBy);

    if (baseX.get() >= textWidth.current) {
      baseX.set(-containerWidth.current); 
    } else if (baseX.get() <= -textWidth.current) {
      baseX.set(containerWidth.current);
    }
  });

  return (
    <div className="parallax w-screen" ref={updateContainerWidth}>
      <motion.div className="scroller" style={{ x: baseX }}>
      <span>{children}</span>
      <span>{children}</span>
      <span>{children}</span>
      <span>{children}</span>
      <span>{children}</span>
      </motion.div>
    </div>
  );
};


export default function AboutUs() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const scrollProgress = useMotionValue(0)
  const imageScale = useTransform(scrollProgress, [0, 1], [1, 1.2])

  useEffect(() => {
    const updateScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const fullHeight = document.body.scrollHeight
      scrollProgress.set(scrollPosition / (fullHeight - windowHeight))
    }
    window.addEventListener("scroll", updateScroll)
    return () => window.removeEventListener("scroll", updateScroll)
  }, [scrollProgress])

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="mx-auto px-4 max-w-7xl">
        <motion.h1
          className="text-7xl font-bold text-center mb-4 bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedText text="Step   into   the   Future   with   Fusion" />
        </motion.h1>
        
        <motion.div 
          className="text-center mb-16"
          style={{ opacity, scale }}
        >
          <motion.h2 
            className="text-5xl font-semibold mb-8 text-gray-800 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedText text="Where   Style   Meets   Innovation" />
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            At Fusion, we blend cutting-edge technology with timeless style to create shoes that not only look amazing but feel incredible. Our passion for innovation drives us to push the boundaries of what's possible in footwear.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            className="space-y-8"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
          >
            <motion.p 
              className="text-2xl text-gray-700 leading-relaxed"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              Fusion is more than just a shoe store; it's a revolution in footwear. Born from a passion for style and comfort, we're redefining what it means to walk in style.
            </motion.p>
            <motion.p 
              className="text-2xl text-gray-700 leading-relaxed"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              Our mission is simple: to provide you with shoes that not only look great but feel amazing. We believe that every step you take should be a testament to both fashion and function.
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
            </motion.div>
          </motion.div>
          <motion.div
            className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{ scale: imageScale }}
          >
            <Image
              src={photos[0]}
              alt="Fusion shoes showcase"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </motion.div>
        </div>

        <div className="mb-32">
          <motion.div 
            className="flex space-x-4"
            animate={{ x: [0, -1940] }}
            transition={{ 
              x: { repeat: Infinity, duration: 40, ease: "linear" },
            }}
          >
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                className="relative flex-shrink-0 w-96 h-80 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={photo}
                  alt={`Fusion shoe design ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
                {index >= photos.length - 2 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <p className="text-white text-2xl font-bold">Coming Soon</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`bg-gradient-to-br ${feature.color} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -90 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }
                }
              }}
              whileHover={{ 
                y: -10,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 + index * 0.1
                }}
              >
                <feature.icon className="h-12 w-12 text-white mb-4" />
              </motion.div>
              <motion.h3 
                className="text-2xl font-semibold mb-2 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="text-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mb-32">
          <h2 className="text-5xl font-semibold mb-12 text-center text-gray-800 leading-tight">
            <AnimatedText text="Our   Commitment   to   Quality" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-8 rounded-xl shadow-lg text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Sustainable Materials</h3>
              <p className="leading-relaxed">We're committed to using eco-friendly materials in our shoes, reducing our environmental impact without compromising on style or comfort. Our innovative approach ensures that every pair of Fusion shoes is as kind to the planet as it is to your feet.</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-8 rounded-xl shadow-lg text-white"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Handcrafted Excellence</h3>
              <p className="leading-relaxed">Each pair of Fusion shoes is meticulously crafted by skilled artisans, ensuring the highest quality and attention to detail in every stitch. We believe that true luxury lies in the perfect blend of traditional craftsmanship and cutting-edge design.</p>
            </motion.div>
          </div>
        </div>

        <div className="mb-16 text-2xl">
          <ParallaxText baseVelocity={-10}>Comfort. Style. Innovation.</ParallaxText>
          <ParallaxText baseVelocity={10}>Walk the Future with Fusion.</ParallaxText>
        </div>

        <motion.div
          className="text-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-16 mb-20 rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-5xl font-semibold mb-8 text-white leading-tight">
            <AnimatedText text="Join   the   Fusion   Revolution" />
          </h3>
          <p className="text-2xl text-gray-300 max-w-7xl mx-auto leading-relaxed">
            Experience the perfect blend of style, comfort, and innovation. Step into the future of footwear with Fusion and redefine your journey with every step.
          </p>
        </motion.div>

        <motion.div 
          className=" p-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-3xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-center mb-8 text-white ">
            <AnimatedText text="Experience   the   Fusion   Difference" />
          </h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              { title: "Comfort", description: "Our shoes are designed with your comfort in mind, ensuring every step is a pleasure." },
              { title: "Style", description: "Stay on trend with our cutting-edge designs that turn heads wherever you go." },
              { title: "Durability", description: "Built to last, our shoes stand up to the test of time and daily wear." }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white p-6 rounded-xl shadow-lg"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <motion.h3 
                  className="text-2xl font-semibold mb-4 text-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 * index }}
                >
                  {item.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 * index }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

