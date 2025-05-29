import { useState, useEffect } from 'react';
import { Moon, Sun, Github, Calendar, User, GitCommit, QrCode, Heart, Shield, Users, ChevronDown, ChevronUp } from 'lucide-react';

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
}

interface FAQ {
  question: string;
  answer: string;
}

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "O que é o DoeIT?",
      answer: "O DoeIT é um sistema inovador de doações que utiliza validação por QR Code para garantir transparência e segurança no processo de doação. Desenvolvido em Laravel pelos alunos da EEEP Maria Célia Pinheiro Falcão."
    },
    {
      question: "Como funciona a validação por QR Code?",
      answer: "Cada doação gera um QR Code único que pode ser escaneado para verificar a autenticidade e rastrear o destino da doação, garantindo total transparência no processo."
    },
    {
      question: "Quem pode usar o sistema?",
      answer: "O sistema foi desenvolvido para ONGs, instituições de caridade e qualquer organização que precise de um sistema confiável para gerenciar doações de forma transparente."
    },
    {
      question: "O projeto é open source?",
      answer: "Sim! O DoeIT é um projeto open source desenvolvido pelos alunos da EEEP Maria Célia Pinheiro Falcão, e você pode acompanhar todo o desenvolvimento através do nosso repositório no GitHub."
    }
  ];

  const teamMembers = [
    {
      name: "Equipe EEEP",
      role: "Desenvolvedores",
      description: "Alunos dedicados da EEEP Maria Célia Pinheiro Falcão"
    }
  ];

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/GuilhermmeDev/doe.it/commits?per_page=10');
        const data = await response.json();
        setCommits(data);
      } catch (error) {
        console.error('Erro ao buscar commits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <QrCode className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">DoeIT</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#sobre" 
                onClick={(e) => { e.preventDefault(); scrollToSection('sobre'); }}
                className="hover:text-blue-500 transition-colors cursor-pointer"
              >
                Sobre
              </a>
              <a 
                href="#equipe" 
                onClick={(e) => { e.preventDefault(); scrollToSection('equipe'); }}
                className="hover:text-blue-500 transition-colors cursor-pointer"
              >
                Equipe
              </a>
              <a 
                href="#faq" 
                onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
                className="hover:text-blue-500 transition-colors cursor-pointer"
              >
                FAQ
              </a>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Shield className="h-4 w-4" />
            <span>Sistema de Doação Seguro</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              DoeIT
            </span>
            <br />
            Doações com QR Code
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Sistema inovador de doações com validação por QR Code, desenvolvido em Laravel pelos 
            alunos da EEEP Maria Célia Pinheiro Falcão. Transparência e segurança em cada doação.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/GuilhermmeDev/doe.it"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>Ver no GitHub</span>
            </a>
            <button
              onClick={() => scrollToSection('commits')}
              className={`inline-flex items-center space-x-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors`}
            >
              <GitCommit className="h-5 w-5" />
              <span>Ver Commits</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre o Projeto</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Inovação em doações com tecnologia Laravel
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <QrCode className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-4">Validação QR Code</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cada doação gera um QR Code único para validação e rastreamento, 
                garantindo transparência total no processo.
              </p>
            </div>
            
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <Heart className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-4">Facilidade de Uso</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Interface intuitiva e processo simplificado para facilitar 
                doações e aumentar o engajamento.
              </p>
            </div>
            
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <Shield className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-4">Segurança Laravel</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Desenvolvido com Laravel, garantindo robustez, segurança 
                e escalabilidade para o sistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipe Section */}
      <section id="equipe" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Equipe</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Desenvolvido pelos talentosos alunos da EEEP Maria Célia Pinheiro Falcão
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className={`text-center p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-500 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
              </div>
            ))}
          </div>
          
          <div className={`mt-12 p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} text-center`}>
            <h3 className="text-2xl font-bold mb-4">EEEP Maria Célia Pinheiro Falcão</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Escola Estadual de Educação Profissional que forma jovens talentos em tecnologia. 
              O projeto DoeIT representa o comprometimento da instituição com a inovação e 
              responsabilidade social, capacitando alunos para desenvolver soluções que impactam positivamente a sociedade.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tire suas dúvidas sobre o DoeIT
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg overflow-hidden`}>
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  {openFAQ === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commits Section */}
      <section id="commits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Histórico de Desenvolvimento</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Acompanhe os últimos commits do projeto
            </p>
          </div>
          
          {loading ? (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <span>Carregando commits...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {commits.map((commit) => (
                <div key={commit.sha} className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-l-4 border-blue-500`}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {commit.author?.avatar_url ? (
                        <img
                          src={commit.author.avatar_url}
                          alt={commit.author.login}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-medium mb-2">{commit.commit.message}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{commit.author?.login || commit.commit.author.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(commit.commit.author.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitCommit className="h-4 w-4" />
                          <span className="font-mono text-xs">{commit.sha.substring(0, 7)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <QrCode className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">DoeIT</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Sistema de doações com validação por QR Code
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 EEEP Maria Célia Pinheiro Falcão. Projeto desenvolvido pelos alunos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;