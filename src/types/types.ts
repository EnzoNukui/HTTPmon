export type StatusCategory = 'Informational' | 'Success' | 'Redirection' | 'Client Error' | 'Server Error'

export type RelatedStatus = {
  code: number
  name: string
}

export type StatusMedia = {
  preview?: string
  full?: string
}

export type ResolutionStep = {
  title: string
  description: string
}

export type HttpStatus = {
  code: number
  name: string
  category: StatusCategory
  categoryRange: string
  categoryLabel: string
  description: string
  meaning: string
  example: string
  commonCauses: string[]
  resolutionSteps?: ResolutionStep[]
  relatedStatuses: RelatedStatus[]
  media: StatusMedia
  mediaType: 'gif' | 'video'
  mediaDescription: string
  mediaReason: string
  tenorId?: string
  tenorPageUrl?: string
}
