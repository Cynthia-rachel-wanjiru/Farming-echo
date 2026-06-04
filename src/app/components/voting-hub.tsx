import React, { useState } from 'react';
import { User } from '../App';
import { Vote, ThumbsUp, ThumbsDown, Clock, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Proposal {
  id: string;
  title: string;
  description: string;
  proposedBy: string;
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  totalMembers: number;
  deadline: Date;
  status: 'active' | 'passed' | 'rejected';
  userVote?: 'yes' | 'no' | 'abstain';
}

interface VotingHubProps {
  user: User;
  language: 'en' | 'sw';
}

export function VotingHub({ user, language }: VotingHubProps) {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: '1',
      title: language === 'en' ? 'Bulk Purchase: Organic Fertilizer' : 'Ununuzi wa Wingi: Mbolea Asili',
      description: language === 'en'
        ? 'Proposal to purchase 50 tons of organic fertilizer at a discounted rate of KES 2,500 per ton. This represents a 20% savings compared to individual purchases.'
        : 'Pendekezo la kununua tani 50 za mbolea asili kwa bei ya punguzo ya KES 2,500 kwa tani. Hii inawakilisha akiba ya 20% ikilinganishwa na ununuzi wa mtu binafsi.',
      proposedBy: 'John Mwangi (Leader)',
      votes: { yes: 45, no: 8, abstain: 2 },
      totalMembers: 67,
      deadline: new Date(Date.now() + 86400000 * 2),
      status: 'active',
    },
    {
      id: '2',
      title: language === 'en' ? 'Water Irrigation System Investment' : 'Uwekezaji wa Mfumo wa Umwagiliaji',
      description: language === 'en'
        ? 'Investment in shared drip irrigation system for 20 hectares. Total cost KES 450,000, split among 30 members.'
        : 'Uwekezaji katika mfumo wa pamoja wa umwagiliaji wa tone kwa hektari 20. Jumla ya gharama KES 450,000, kugawanywa kati ya wanachama 30.',
      proposedBy: 'Mary Wanjiku (Leader)',
      votes: { yes: 52, no: 10, abstain: 5 },
      totalMembers: 67,
      deadline: new Date(Date.now() + 86400000 * 5),
      status: 'active',
    },
    {
      id: '3',
      title: language === 'en' ? 'Seed Bank Establishment' : 'Kuanzisha Benki ya Mbegu',
      description: language === 'en'
        ? 'Create a community seed bank for drought-resistant maize and beans. Initial budget: KES 80,000.'
        : 'Kuunda benki ya mbegu ya jamii kwa mahindi na maharage yanayostahimili ukame. Bajeti ya awali: KES 80,000.',
      proposedBy: 'Dr. Kamau (Expert)',
      votes: { yes: 61, no: 2, abstain: 1 },
      totalMembers: 67,
      deadline: new Date(Date.now() - 86400000),
      status: 'passed',
    },
  ]);

  const [showNewProposal, setShowNewProposal] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
  });

  const translations = {
    en: {
      votingHub: 'Collective Decision Hub',
      activeProposals: 'Active Proposals',
      pastDecisions: 'Past Decisions',
      createProposal: 'Create Proposal',
      proposalTitle: 'Proposal Title',
      proposalDescription: 'Description',
      submit: 'Submit Proposal',
      cancel: 'Cancel',
      voteYes: 'Vote Yes',
      voteNo: 'Vote No',
      abstain: 'Abstain',
      proposedBy: 'Proposed by',
      deadline: 'Deadline',
      consensus: 'Consensus',
      voted: 'You voted',
      status: 'Status',
      passed: 'PASSED',
      rejected: 'REJECTED',
      active: 'ACTIVE',
      votesNeeded: 'votes needed for consensus',
    },
    sw: {
      votingHub: 'Kituo cha Maamuzi ya Pamoja',
      activeProposals: 'Mapendekezo Hai',
      pastDecisions: 'Maamuzi ya Zamani',
      createProposal: 'Unda Pendekezo',
      proposalTitle: 'Kichwa cha Pendekezo',
      proposalDescription: 'Maelezo',
      submit: 'Wasilisha Pendekezo',
      cancel: 'Ghairi',
      voteYes: 'Piga Kura Ndiyo',
      voteNo: 'Piga Kura Hapana',
      abstain: 'Jiepushe',
      proposedBy: 'Imependekezwa na',
      deadline: 'Muda wa Mwisho',
      consensus: 'Makubaliano',
      voted: 'Ulipiga kura',
      status: 'Hali',
      passed: 'IMEPITA',
      rejected: 'IMEKATALIWA',
      active: 'HAI',
      votesNeeded: 'kura zinahitajika kwa makubaliano',
    },
  };

  const t = translations[language];

  const handleVote = (proposalId: string, vote: 'yes' | 'no' | 'abstain') => {
    setProposals(proposals.map(p => {
      if (p.id === proposalId && p.status === 'active') {
        const newVotes = { ...p.votes };
        if (p.userVote) {
          newVotes[p.userVote]--;
        }
        newVotes[vote]++;
        return { ...p, votes: newVotes, userVote: vote };
      }
      return p;
    }));
  };

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const proposal: Proposal = {
      id: Date.now().toString(),
      title: newProposal.title,
      description: newProposal.description,
      proposedBy: `${user.name} (${user.role === 'leader' ? 'Leader' : user.role === 'expert' ? 'Expert' : 'Farmer'})`,
      votes: { yes: 0, no: 0, abstain: 0 },
      totalMembers: 67,
      deadline: new Date(Date.now() + 86400000 * 7),
      status: 'active',
    };
    setProposals([proposal, ...proposals]);
    setNewProposal({ title: '', description: '' });
    setShowNewProposal(false);
  };

  const calculateConsensus = (proposal: Proposal) => {
    const totalVotes = proposal.votes.yes + proposal.votes.no + proposal.votes.abstain;
    const yesPercentage = totalVotes > 0 ? (proposal.votes.yes / proposal.totalMembers) * 100 : 0;
    return Math.round(yesPercentage);
  };

  const activeProposals = proposals.filter(p => p.status === 'active');
  const pastProposals = proposals.filter(p => p.status !== 'active');

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#2D5016] flex items-center gap-2">
            <Vote className="w-7 h-7" />
            {t.votingHub}
          </h2>
          {(user.role === 'leader' || user.role === 'expert') && (
            <button
              onClick={() => setShowNewProposal(!showNewProposal)}
              className="px-4 py-2 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6B1F] transition-all flex items-center gap-2"
            >
              <Vote className="w-5 h-5" />
              {t.createProposal}
            </button>
          )}
        </div>
      </motion.div>

      {/* New Proposal Form */}
      <AnimatePresence>
        {showNewProposal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6 overflow-hidden"
          >
            <form onSubmit={handleCreateProposal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D5016] mb-2">
                  {t.proposalTitle}
                </label>
                <input
                  type="text"
                  required
                  value={newProposal.title}
                  onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D5016] mb-2">
                  {t.proposalDescription}
                </label>
                <textarea
                  required
                  rows={4}
                  value={newProposal.description}
                  onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6B1F] transition-all font-medium"
                >
                  {t.submit}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewProposal(false)}
                  className="flex-1 py-3 bg-[#F5F1E8] text-[#2D5016] rounded-lg hover:bg-[#E8E4D9] transition-all font-medium"
                >
                  {t.cancel}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Proposals */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#2D5016] mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          {t.activeProposals}
        </h3>
        <div className="space-y-4">
          {activeProposals.map((proposal) => {
            const consensus = calculateConsensus(proposal);
            const votesNeeded = Math.ceil(proposal.totalMembers * 0.67) - proposal.votes.yes;
            
            return (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#4A7C28]"
              >
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-[#2D5016] mb-2">{proposal.title}</h4>
                  <p className="text-[#8B6F47] mb-3">{proposal.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-[#2D5016]">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {t.proposedBy}: {proposal.proposedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {t.deadline}: {proposal.deadline.toLocaleDateString(language === 'en' ? 'en-KE' : 'sw-KE')}
                    </span>
                  </div>
                </div>

                {/* Consensus Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-[#2D5016]">{t.consensus}</span>
                    <span className="text-sm font-bold text-[#4A7C28]">{consensus}%</span>
                  </div>
                  <div className="w-full bg-[#F5F1E8] rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${consensus}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#4A7C28] to-[#2D5016] rounded-full"
                    />
                  </div>
                  <p className="text-xs text-[#8B6F47] mt-1">
                    {votesNeeded > 0 ? `${votesNeeded} ${t.votesNeeded}` : t.passed}
                  </p>
                </div>

                {/* Vote Counts */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-700">{proposal.votes.yes}</div>
                    <div className="text-xs text-green-600">{language === 'en' ? 'Yes' : 'Ndiyo'}</div>
                  </div>
                  <div className="bg-red-50 border-2 border-red-500 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-700">{proposal.votes.no}</div>
                    <div className="text-xs text-red-600">{language === 'en' ? 'No' : 'Hapana'}</div>
                  </div>
                  <div className="bg-gray-50 border-2 border-gray-400 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-700">{proposal.votes.abstain}</div>
                    <div className="text-xs text-gray-600">{language === 'en' ? 'Abstain' : 'Jiepushe'}</div>
                  </div>
                </div>

                {/* Voting Buttons */}
                {proposal.userVote ? (
                  <div className="bg-[#F5F1E8] border-2 border-[#2D5016] rounded-lg p-4 text-center">
                    <p className="text-[#2D5016] font-medium">
                      {t.voted}: <span className="font-bold uppercase">{proposal.userVote}</span>
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleVote(proposal.id, 'yes')}
                      className="py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-1 font-medium"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      <span className="hidden sm:inline">{t.voteYes}</span>
                    </button>
                    <button
                      onClick={() => handleVote(proposal.id, 'no')}
                      className="py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-1 font-medium"
                    >
                      <ThumbsDown className="w-5 h-5" />
                      <span className="hidden sm:inline">{t.voteNo}</span>
                    </button>
                    <button
                      onClick={() => handleVote(proposal.id, 'abstain')}
                      className="py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all font-medium"
                    >
                      {t.abstain}
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Past Decisions */}
      <div>
        <h3 className="text-xl font-bold text-[#2D5016] mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {t.pastDecisions}
        </h3>
        <div className="space-y-4">
          {pastProposals.map((proposal) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#8B6F47]"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-bold text-[#2D5016]">{proposal.title}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  proposal.status === 'passed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {proposal.status === 'passed' ? t.passed : t.rejected}
                </span>
              </div>
              <p className="text-sm text-[#8B6F47] mb-2">{proposal.description}</p>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <span className="font-bold text-green-700">{proposal.votes.yes}</span>
                  <span className="text-gray-600 ml-1">{language === 'en' ? 'Yes' : 'Ndiyo'}</span>
                </div>
                <div>
                  <span className="font-bold text-red-700">{proposal.votes.no}</span>
                  <span className="text-gray-600 ml-1">{language === 'en' ? 'No' : 'Hapana'}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-700">{proposal.votes.abstain}</span>
                  <span className="text-gray-600 ml-1">{language === 'en' ? 'Abstain' : 'Jiepushe'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
