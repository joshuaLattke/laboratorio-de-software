export class NotificationManager {
    static sendEmail(user, message) {
        console.log(`Email sent to ${user.name}: ${message}`);
    }

    static sendSMS(user, message) {
        console.log(`SMS sent to ${user.name}: ${message}`);
    }
}
