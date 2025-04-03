// This client-side utility handles email templates for displaying in the UI

export interface EmailTemplateProps {
  firstName: string;
  username?: string;
  password?: string;
  reason?: string;
}

export const emailTemplates = {
  welcome: (props: EmailTemplateProps): string => {
    const { firstName, username, password } = props;
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2563eb; padding: 20px; text-align: center; color: white;">
          <h1>Welcome to WOEC!</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
          <p>Hello ${firstName},</p>
          <p>We're excited to have you join Wis Online English Course. Your application has been approved!</p>
          <p>Here are your login credentials:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Username:</strong> ${username || '[username]'}</p>
            <p><strong>Password:</strong> ${password || '[password]'}</p>
          </div>
          <p>Please login to your student portal to access your course materials and schedule.</p>
          <p>For security reasons, we recommend changing your password after your first login.</p>
          <div style="margin-top: 30px;">
            <a href="#" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Login to Student Portal
            </a>
          </div>
          <p style="margin-top: 30px;">If you have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>The WOEC Team</p>
        </div>
        <div style="background-color: #f3f4f6; padding: 10px; text-align: center; color: #6b7280; font-size: 12px;">
          <p>&copy; 2023 Wis Online English Course. All rights reserved.</p>
        </div>
      </div>
    `;
  },
  
  rejection: (props: EmailTemplateProps): string => {
    const { firstName, reason } = props;
    const defaultReason = "We have reached our capacity for this enrollment period.";
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #2563eb; padding: 20px; text-align: center; color: white;">
          <h1>WOEC Application Update</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
          <p>Hello ${firstName},</p>
          <p>Thank you for your interest in Wis Online English Course.</p>
          <p>After careful review of your application, we regret to inform you that we are unable to offer you a place in our program at this time.</p>
          <p><strong>Reason:</strong> ${reason || defaultReason}</p>
          <p>We encourage you to apply again for our next enrollment period.</p>
          <p>If you have any questions or would like more information, please don't hesitate to contact us.</p>
          <p>Best regards,<br>The WOEC Team</p>
        </div>
        <div style="background-color: #f3f4f6; padding: 10px; text-align: center; color: #6b7280; font-size: 12px;">
          <p>&copy; 2023 Wis Online English Course. All rights reserved.</p>
        </div>
      </div>
    `;
  }
};
