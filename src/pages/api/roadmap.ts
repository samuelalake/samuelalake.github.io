import type { NextApiRequest, NextApiResponse } from 'next';
import { getPortfolioRoadmap } from '../../lib/github-tasks-sync';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { project } = req.query;
    const projectName = typeof project === 'string' ? project : undefined;

    const roadmapData = await getPortfolioRoadmap(projectName);

    res.status(200).json({
      success: true,
      data: roadmapData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch roadmap data',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}