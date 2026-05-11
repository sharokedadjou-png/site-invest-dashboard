'use client';

import { useState } from 'react';
import {
  Bell,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Users,
  Shield,
  TrendingUp,
  Settings,
  CreditCard,
  Check,
  AlertCircle,
} from 'lucide-react';

type Notification = {
  type: 'success' | 'error';
  message: string;
} | null;

const investmentPlans = [
  {
    name: 'Starter',
    roi: '10%',
    duration: '30 jours',
    minimum: '10,000 FCFA',
  },
  {
    name: 'Gold',
    roi: '25%',
    duration: '60 jours',
    minimum: '50,000 FCFA',
  },
  {
    name: 'VIP',
    roi: '40%',
    duration: '90 jours',
    minimum: '100,000 FCFA',
  },
];

const transactions = [
  {
    title: 'Dépôt Orange Money',
    amount: '+150,000 FCFA',
    status: 'Confirmé',
  },
  {
    title: 'Investissement Gold',
    amount: '-50,000 FCFA',
    status: 'Actif',
  },
  {
    title: 'Profit Quotidien',
    amount: '+12,500 FCFA',
    status: 'Reçu',
  },
];

export default function GlobalInvestissementDashboard() {
  const [selectedPlan, setSelectedPlan] = useState('Gold');

  // État pour le formulaire de dépôt
  const [depositForm, setDepositForm] = useState({
    paymentMethod: 'Orange Money',
    amount: '',
    reference: '',
  });

  // État pour le formulaire de retrait
  const [withdrawForm, setWithdrawForm] = useState({
    paymentMethod: 'Orange Money',
    phone: '',
    amount: '',
  });

  // État pour les messages de notification
  const [notification, setNotification] = useState<Notification>(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Valider montant
  const validateAmount = (amount: string) => {
    return !isNaN(Number(amount)) && Number(amount) > 0;
  };

  // Valider numéro téléphone
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{9,10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Gérer le dépôt
  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!depositForm.amount || !validateAmount(depositForm.amount)) {
      setNotification({
        type: 'error',
        message: 'Veuillez entrer un montant valide',
      });
      return;
    }

    if (!depositForm.reference.trim()) {
      setNotification({
        type: 'error',
        message: 'Veuillez entrer la référence de transaction',
      });
      return;
    }

    // Succès
    setNotification({
      type: 'success',
      message: `Dépôt de ${depositForm.amount} FCFA envoyé avec succès!`,
    });

    // Réinitialiser le formulaire
    setDepositForm({
      paymentMethod: 'Orange Money',
      amount: '',
      reference: '',
    });

    // Masquer le message après 5 secondes
    setTimeout(() => setNotification(null), 5000);
  };

  // Gérer le retrait
  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!withdrawForm.phone || !validatePhone(withdrawForm.phone)) {
      setNotification({
        type: 'error',
        message: 'Veuillez entrer un numéro de téléphone valide',
      });
      return;
    }

    if (!withdrawForm.amount || !validateAmount(withdrawForm.amount)) {
      setNotification({
        type: 'error',
        message: 'Veuillez entrer un montant valide',
      });
      return;
    }

    // Succès
    setNotification({
      type: 'success',
      message: `Demande de retrait de ${withdrawForm.amount} FCFA soumise!`,
    });

    // Réinitialiser le formulaire
    setWithdrawForm({
      paymentMethod: 'Orange Money',
      phone: '',
      amount: '',
    });

    // Masquer le message après 5 secondes
    setTimeout(() => setNotification(null), 5000);
  };

  // Copier lien parrainage
  const copyReferralLink = () => {
    const referralLink = 'https://globalinvest.com/ref/arthur2026';
    navigator.clipboard.writeText(referralLink);
    setCopiedToClipboard(true);
    setNotification({
      type: 'success',
      message: 'Lien copié au presse-papiers!',
    });
    setTimeout(() => setCopiedToClipboard(false), 2000);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 rounded-2xl p-5 flex items-center gap-3 animate-in slide-in-from-top ${
            notification.type === 'success'
              ? 'bg-green-900 border border-green-700'
              : 'bg-red-900 border border-red-700'
          }`}
        >
          {notification.type === 'success' ? (
            <Check className="w-5 h-5 text-green-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">
              GLOBAL INVESTISSEMENT
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Plateforme d'investissement intelligente
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button
              className="relative bg-zinc-900 p-3 rounded-2xl border border-zinc-800 hover:border-yellow-400 transition"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-2">
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-lg">
                A
              </div>

              <div>
                <p className="font-semibold">Arthur Admin</p>
                <p className="text-zinc-400 text-sm">Compte VIP</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 bg-zinc-950 border-r border-zinc-800 min-h-screen p-6">
          <nav className="space-y-3">
            {[
              {
                icon: <TrendingUp className="w-5 h-5" />,
                label: 'Dashboard',
              },
              {
                icon: <Wallet className="w-5 h-5" />,
                label: 'Portefeuille',
              },
              {
                icon: <ArrowDownCircle className="w-5 h-5" />,
                label: 'Dépôts',
              },
              {
                icon: <ArrowUpCircle className="w-5 h-5" />,
                label: 'Retraits',
              },
              {
                icon: <CreditCard className="w-5 h-5" />,
                label: 'Investissements',
              },
              {
                icon: <Users className="w-5 h-5" />,
                label: 'Parrainage',
              },
              {
                icon: <Shield className="w-5 h-5" />,
                label: 'Sécurité',
              },
              {
                icon: <Settings className="w-5 h-5" />,
                label: 'Paramètres',
              },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 bg-zinc-900 hover:bg-yellow-500 hover:text-black transition p-4 rounded-2xl border border-zinc-800"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 lg:p-10">
          {/* Hero */}
          <section className="bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-[30px] text-black p-8 mb-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="uppercase tracking-widest font-semibold mb-3">
                  Bienvenue sur Global Investissement
                </p>

                <h2 className="text-5xl font-black leading-tight mb-5">
                  Investissez et faites croître votre capital.
                </h2>

                <p className="text-lg mb-8 opacity-80">
                  Contrôlez vos investissements, suivez vos profits et gérez
                  vos retraits depuis une plateforme moderne et sécurisée.
                </p>

                <div className="flex gap-4 flex-wrap">
                  <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">
                    Commencer
                  </button>

                  <button className="border-2 border-black px-8 py-4 rounded-2xl font-bold hover:bg-black hover:text-white transition">
                    Voir les plans
                  </button>
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-md rounded-[30px] p-8 border border-black/20">
                <p className="text-sm font-semibold uppercase mb-2">
                  Solde Total
                </p>

                <h3 className="text-6xl font-black mb-6">
                  2,450,000
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 rounded-2xl p-4">
                    <p className="text-sm">Bénéfices</p>
                    <h4 className="text-2xl font-bold mt-2">560,000</h4>
                  </div>

                  <div className="bg-black/20 rounded-2xl p-4">
                    <p className="text-sm">Investissements</p>
                    <h4 className="text-2xl font-bold mt-2">3 Actifs</h4>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: 'Total Dépôts',
                value: '5,450,000 FCFA',
              },
              {
                title: 'Total Retraits',
                value: '2,150,000 FCFA',
              },
              {
                title: 'Profit Quotidien',
                value: '+12,500 FCFA',
              },
              {
                title: 'Parrainages',
                value: '42 Membres',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-6 hover:border-yellow-400 transition"
              >
                <p className="text-zinc-400 text-sm">{item.title}</p>

                <h3 className="text-3xl font-bold text-yellow-400 mt-4">
                  {item.value}
                </h3>
              </div>
            ))}
          </section>

          {/* Investment Plans */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">Plans d'investissement</h2>
                <p className="text-zinc-400 mt-2">
                  Choisissez le plan qui correspond à vos objectifs.
                </p>
              </div>

              <button className="bg-yellow-500 text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition">
                Nouveau Dépôt
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {investmentPlans.map((plan) => (
                <div
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`cursor-pointer rounded-[30px] p-8 transition border ${
                    selectedPlan === plan.name
                      ? 'bg-yellow-500 text-black border-yellow-400 scale-105'
                      : 'bg-zinc-900 border-zinc-800 hover:border-yellow-400'
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold">{plan.name}</h3>

                    {plan.name === 'Gold' && (
                      <div className="bg-black/20 px-4 py-2 rounded-full text-sm font-bold">
                        Populaire
                      </div>
                    )}
                  </div>

                  <h4 className="text-6xl font-black mb-4">{plan.roi}</h4>

                  <div className="space-y-3 mb-8">
                    <p>Durée : {plan.duration}</p>
                    <p>Minimum : {plan.minimum}</p>
                    <p>Retrait : Disponible</p>
                  </div>

                  <button
                    className={`w-full py-4 rounded-2xl font-bold transition ${
                      selectedPlan === plan.name
                        ? 'bg-black text-white hover:bg-zinc-800'
                        : 'bg-yellow-500 text-black hover:bg-yellow-600'
                    }`}
                  >
                    Investir Maintenant
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Mobile Money */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Dépôt */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold">
                    Dépôt Mobile Money
                  </h2>
                  <p className="text-zinc-400 mt-2">
                    Orange Money & MTN Mobile Money
                  </p>
                </div>

                <Wallet className="w-10 h-10 text-yellow-400" />
              </div>

              <form onSubmit={handleDeposit} className="space-y-5">
                <select
                  value={depositForm.paymentMethod}
                  onChange={(e) =>
                    setDepositForm({
                      ...depositForm,
                      paymentMethod: e.target.value,
                    })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:border-yellow-400 focus:outline-none transition"
                >
                  <option>Orange Money</option>
                  <option>MTN Mobile Money</option>
                </select>

                <input
                  type="number"
                  placeholder="Montant dépôt"
                  value={depositForm.amount}
                  onChange={(e) =>
                    setDepositForm({
                      ...depositForm,
                      amount: e.target.value,
                    })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none transition"
                  min="0"
                />

                <input
                  type="text"
                  placeholder="Référence transaction"
                  value={depositForm.reference}
                  onChange={(e) =>
                    setDepositForm({
                      ...depositForm,
                      reference: e.target.value,
                    })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none transition"
                />

                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-bold hover:scale-[1.02] transition"
                >
                  Envoyer le dépôt
                </button>
              </form>
            </div>

            {/* Retrait */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold">Retrait Rapide</h2>
                  <p className="text-zinc-400 mt-2">
                    Retirez vos gains facilement.
                  </p>
                </div>

                <ArrowUpCircle className="w-10 h-10 text-yellow-400" />
              </div>

              <form onSubmit={handleWithdraw} className="space-y-5">
                <select
                  value={withdrawForm.paymentMethod}
                  onChange={(e) =>
                    setWithdrawForm({
                      ...withdrawForm,
                      paymentMethod: e.target.value,
                    })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:border-yellow-400 focus:outline-none transition"
                >
                  <option>Orange Money</option>
                  <option>MTN Mobile Money</option>
                </select>

                <input
                  type="tel"
                  placeholder="Numéro téléphone"
                  value={withdrawForm.phone}
                  onChange={(e) =>
                    setWithdrawForm({
                      ...withdrawForm,
                      phone: e.target.value,
                    })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none transition"
                />

                <input
                  type="number"
                  placeholder="Montant retrait"
                  value={withdrawForm.amount}
                  onChange={(e) =>
                    setWithdrawForm({
                      ...withdrawForm,
                      amount: e.target.value,
                    })
                  }
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none transition"
                  min="0"
                />

                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold hover:scale-[1.02] hover:bg-red-600 transition"
                >
                  Demander retrait
                </button>
              </form>
            </div>
          </section>

          {/* Transactions */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-[30px] p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">
                  Activités Récentes
                </h2>
                <p className="text-zinc-400 mt-2">
                  Historique des transactions et investissements.
                </p>
              </div>

              <button className="bg-yellow-500 text-black px-5 py-3 rounded-2xl font-bold hover:bg-yellow-600 transition">
                Voir Tout
              </button>
            </div>

            <div className="space-y-4">
              {transactions.map((item) => (
                <div
                  key={item.title}
                  className="bg-black border border-zinc-800 rounded-2xl p-5 flex items-center justify-between hover:border-zinc-700 transition"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-zinc-400 mt-1">{item.status}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-400">
                      {item.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Referral */}
          <section className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-[30px] p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-black mb-4 text-yellow-400">
                  Gagnez avec le parrainage
                </h2>

                <p className="text-zinc-400 text-lg mb-6">
                  Invitez vos amis et gagnez des commissions sur leurs
                  investissements.
                </p>

                <div className="bg-black border border-zinc-700 rounded-2xl p-5 flex items-center justify-between">
                  <span className="truncate text-sm lg:text-base">
                    https://globalinvest.com/ref/arthur2026
                  </span>

                  <button
                    onClick={copyReferralLink}
                    className={`px-5 py-3 rounded-xl font-bold transition ${
                      copiedToClipboard
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 text-black hover:bg-yellow-600'
                    }`}
                  >
                    {copiedToClipboard ? 'Copié ✓' : 'Copier'}
                  </button>
                </div>
              </div>

              <div className="bg-black border border-zinc-800 rounded-[30px] p-8 text-center">
                <h3 className="text-6xl font-black text-yellow-400 mb-4">
                  10%
                </h3>

                <p className="text-zinc-400 text-lg mb-6">
                  Commission sur chaque investissement.
                </p>

                <button className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 hover:bg-yellow-600 transition">
                  Inviter Maintenant
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
