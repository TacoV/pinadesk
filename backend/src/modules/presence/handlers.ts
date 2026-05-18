import { Request, Response } from 'express'
import { prisma } from '../../db'

export async function getPresence(req: Request, res: Response) {
  const { userId } = req.params
  const { startDate, endDate } = req.query

  try {
    if (!userId) {
      res.status(400).json({ error: 'userId is required', code: 'INVALID_REQUEST' })
      return
    }

    const presences = await prisma.userPresence.findMany({
      where: {
        userId,
        date: {
          gte: startDate ? new Date(startDate as string) : undefined,
          lte: endDate ? new Date(endDate as string) : undefined
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    res.json(presences)
  } catch (error) {
    console.error('Error fetching presence:', error)
    res.status(500).json({ error: 'Failed to fetch presence', code: 'INTERNAL_ERROR' })
  }
}

export async function setPresence(req: Request, res: Response) {
  const { userId } = req.params
  const { date } = req.body

  try {
    if (!userId || !date) {
      res.status(400).json({ error: 'userId and date are required', code: 'INVALID_REQUEST' })
      return
    }

    const parsedDate = new Date(date)
    
    const presence = await prisma.userPresence.upsert({
      where: {
        userId_date: {
          userId,
          date: parsedDate
        }
      },
      update: {},
      create: {
        userId,
        date: parsedDate
      }
    })

    res.json(presence)
  } catch (error) {
    console.error('Error setting presence:', error)
    res.status(500).json({ error: 'Failed to set presence', code: 'INTERNAL_ERROR' })
  }
}

export async function deletePresence(req: Request, res: Response) {
  const { userId } = req.params
  const { date } = req.body

  try {
    if (!userId || !date) {
      res.status(400).json({ error: 'userId and date are required', code: 'INVALID_REQUEST' })
      return
    }

    const parsedDate = new Date(date)
    
    await prisma.userPresence.delete({
      where: {
        userId_date: {
          userId,
          date: parsedDate
        }
      }
    })

    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting presence:', error)
    res.status(500).json({ error: 'Failed to delete presence', code: 'INTERNAL_ERROR' })
  }
}
