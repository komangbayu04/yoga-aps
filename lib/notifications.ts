import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleReminder(
  hour: number,
  minute: number,
  days: number[],
  title: string,
  body: string,
) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  for (const day of days) {
    await Notifications.scheduleNotificationAsync({
      content: { title, body, data: { url: 'officeflex://recommended' } },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        weekday: day,
        hour,
        minute,
      },
    });
  }
}
