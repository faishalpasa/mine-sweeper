export const eventTracking = (name: string, props?: Record<string, any>) => {
  return window.dataLayer.push({
    event: 'event',
    eventProps: {
      name: name,
      ...props
    }
  })
}

export const pageTracking = (title: string) => {
  return window.dataLayer.push({
    event: 'pageview',
    eventProps: {
      title: title,
      url: window.location.href
    }
  })
}
