
export const ClientsSection = () => {
  const clients = [
    { name: 'TechCorp', service: 'LinkedIn Branding + Website Development' },
    { name: 'StartupX', service: 'Technical Writing + SEO' },
    { name: 'DesignCo', service: 'Website Development' },
    { name: 'MarketingPro', service: 'LinkedIn Management' },
    { name: 'DevStudio', service: 'Technical Documentation' },
    { name: 'GrowthHub', service: 'Content Strategy + Development' },
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Worked With
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clients.map((client, index) => (
            <div 
              key={client.name}
              className="group relative bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {client.name.substring(0, 2)}
                </span>
              </div>
              <h3 className="font-semibold text-sm">{client.name}</h3>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                {client.service}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
