const Stats = () => {
  const stats = [
    { number: "25+", label: "Years of Excellence", color: "text-blue-600" },
    { number: "15,000+", label: "Happy Patients", color: "text-green-600" },
    { number: "50+", label: "Medical Experts", color: "text-purple-600" },
    { number: "99%", label: "Success Rate", color: "text-red-600" }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-in">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-blue-100 text-lg font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;