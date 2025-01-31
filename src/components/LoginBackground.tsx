setTimeout(() => {
    new Notification(`Upcoming Event: ${event.title}`, {
      body: `Your event starts in 30 minutes at ${event.time}\nLocation: ${event.location}`,
      icon: event.imageUrl,
      silent: false
    });
  }, timeUntilNotification); 