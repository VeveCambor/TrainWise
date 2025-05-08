import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChartBarIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const features = [
    {
      name: 'Tréninkové plány',
      description: 'Vytvořte si vlastní tréninkový plán na míru.',
      icon: CalendarIcon,
      href: '/training-plans',
      color: 'text-trainwise-coral',
    },
    {
      name: 'Sledování pokroku',
      description: 'Sledujte svůj pokrok a dosažené výsledky.',
      icon: ChartBarIcon,
      href: '/progress',
      color: 'text-trainwise-sage',
    },
  ];

  return (
    <div className="relative isolate w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full px-0 py-24 sm:py-32 lg:px-0"
      >
        <div className="w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight text-trainwise-darktext sm:text-6xl"
          >
            TrainWise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Váš osobní tréninkový partner.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 sm:mt-20 lg:mt-24 w-full"
        >
          <dl className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col w-full"
              >
                <Link
                  to={feature.href}
                  className="flex flex-col h-full bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-trainwise-darktext">
                    <feature.icon
                      className={`h-5 w-5 flex-none ${feature.color}`}
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <span className="text-sm font-semibold leading-6 text-trainwise-coral">
                        Zjistit více <span aria-hidden="true">→</span>
                      </span>
                    </p>
                  </dd>
                </Link>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </div>
  );
} 