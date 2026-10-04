import { mockData } from "@/data/mockData";

export const dataService = {
  async listQualityThemes() {
    return mockData.QualityTheme || [];
  },

  async getQualityTheme(id) {
    const list = mockData.QualityTheme || [];
    return list.find((item) => String(item.id) === String(id)) || null;
  },

  async listMaterials() {
    return mockData.Material || [];
  },

  async getMaterial(id) {
    const list = mockData.Material || [];
    return list.find((item) => String(item.id) === String(id)) || null;
  },

  async listDecisionGuides() {
    return mockData.DecisionGuide || [];
  },

  async getDecisionGuide(id) {
    const list = mockData.DecisionGuide || [];
    return list.find((item) => String(item.id) === String(id)) || null;
  },

  async listIsoDocuments() {
    return mockData.IsoDocument || [];
  },

  async smartSearch(query) {
    if (!query || !query.trim()) return [];
    const q = query.trim().toLowerCase();
    const words = q.split(/\s+/).filter(Boolean);

    const scoreItem = (text, weight) => {
      if (!text) return 0;
      const lower = text.toLowerCase();
      if (lower.includes(q)) return weight * 2;
      return words.reduce((acc, word) => (lower.includes(word) ? acc + weight : acc), 0);
    };

    const results = (mockData.QualityTheme || [])
      .map((item) => {
        let score = 0;
        score += scoreItem(item.title, 5);
        score += scoreItem(item.concept, 3);
        score += scoreItem(item.when_to_use, 4);
        score += scoreItem(item.how_to_apply, 2);
        if (Array.isArray(item.contexts)) {
          score += scoreItem(item.contexts.join(" "), 4);
        }
        if (Array.isArray(item.tags)) {
          score += scoreItem(item.tags.join(" "), 3);
        }
        return { item, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((r) => r.item);

    return results;
  },
};
