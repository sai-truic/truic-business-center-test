import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const generateCustomEmailContent = (name, customFields) => {
  return `
    <h2>Hello ${name},</h2>
    <p>Thank you for joining our Business Center! We're excited to help you on your entrepreneurial journey, whether you're just starting out or looking to grow your existing business.</p>
    
    <p>Based on the information you provided during onboarding, we've tailored some resources just for you:</p>
    
    <div class="step">
        <div class="step-title">Your Business Location: ${customFields.BUSINESSSTATE}</div>
        <p>We've curated state-specific resources and regulations to help you navigate the local business landscape.</p>
    </div>
    
    <div class="step">
        <div class="step-title">Your Business Stage: ${customFields.BUSINESSSTAGE}</div>
        <p>We'll provide targeted advice and tools to support you at this crucial stage of your business journey.</p>
    </div>
    
    <div class="step">
        <div class="step-title">Your Business: ${customFields.BUSINESSNAME}</div>
        <p>We're here to help ${customFields.BUSINESSNAME} thrive. Expect personalized insights and strategies tailored to your industry and goals.</p>
    </div>
    
    <p>Here's what you can look forward to:</p>
    <ul>
        <li>Weekly tips and strategies aligned with your business stage</li>
        <li>Local networking opportunities in ${customFields.BUSINESSSTATE}</li>
        <li>Exclusive webinars and workshops on topics relevant to your industry</li>
        <li>Access to our community of entrepreneurs for support and collaboration</li>
    </ul>
    
    <p>To get started, we recommend exploring our resource center:</p>
    <a href="${process.env.RESOURCE_CENTER_URL}" class="button">Explore Business Resources</a>
    
    <p>If you have any questions or need assistance, our support team is always here to help. Just reply to this email or use the chat feature on our website.</p>
    
    <p>Here's to your success!</p>
    <p>Best regards,<br>The Business Center Team</p>
  `;
};

export async function POST(request) {
  try {
    console.log('Newsletter signup process started');
    console.log('WELCOME_EMAIL_AUTOMATION_ID:', process.env.WELCOME_EMAIL_AUTOMATION_ID);
    if (!process.env.WELCOME_EMAIL_AUTOMATION_ID) {
      throw new Error('WELCOME_EMAIL_AUTOMATION_ID is not set');
    }
    const { email, name, onboardingData } = await request.json();
    console.log('Received data:', { email, name, onboardingData });

    // Replace with your Active Campaign API endpoint and credentials
    const AC_API_URL = process.env.ACTIVE_CAMPAIGN_API_URL;
    const AC_API_KEY = process.env.ACTIVE_CAMPAIGN_API_KEY;

    console.log('Active Campaign API URL:', AC_API_URL);

    // Add contact to Active Campaign
    console.log('Adding contact to Active Campaign');
    const contactResponse = await fetch(`${AC_API_URL}/api/3/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': AC_API_KEY,
      },
      body: JSON.stringify({
        contact: {
          email: email,
          firstName: name,
          // Add any additional fields you want to include
        },
      }),
    });

    if (!contactResponse.ok) {
      const errorData = await contactResponse.json();
      console.error('Failed to add contact:', errorData);
      if (errorData.errors && errorData.errors[0].code === 'duplicate') {
        console.log('Contact already exists');
        return NextResponse.json({ alreadyRegistered: true });
      }
      throw new Error('Failed to add contact to Active Campaign');
    }

    const contactData = await contactResponse.json();
    const contactId = contactData.contact.id;
    console.log('Contact added successfully. Contact ID:', contactId);

    // Add contact to the specific list (ID: 22)
    console.log('Adding contact to list');
    const listResponse = await fetch(`${AC_API_URL}/api/3/contactLists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': AC_API_KEY,
      },
      body: JSON.stringify({
        contactList: {
          list: 22,
          contact: contactId,
          status: 1
        },
      }),
    });

    if (!listResponse.ok) {
      console.error('Failed to add contact to list:', await listResponse.text());
      throw new Error('Failed to add contact to the specified list');
    }
    console.log('Contact added to list successfully');

    // Prepare custom fields for the welcome email
    const customFields = {
      BUSINESSSTATE: onboardingData?.businessState || '',
      BUSINESSSTAGE: onboardingData?.businessStage || '',
      BUSINESSNAME: onboardingData?.businessName || ''
    };

    // Generate custom email content
    const customEmailContent = generateCustomEmailContent(name, customFields);
    console.log('Generated custom email content');

    // Update custom fields for the contact
    console.log('Updating custom fields');
    const updateFieldsResponse = await fetch(`${AC_API_URL}/api/3/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': AC_API_KEY,
      },
      body: JSON.stringify({
        contact: {
          fieldValues: [
            {
              field: 'CUSTOMEMAILCONTENT',
              value: customEmailContent
            },
            // Add other custom fields here if needed
          ]
        }
      }),
    });

    if (!updateFieldsResponse.ok) {
      console.error('Failed to update custom fields:', await updateFieldsResponse.text());
      throw new Error('Failed to update custom fields');
    }
    console.log('Custom fields updated successfully');

    // Trigger the automation
    console.log('Triggering automation');
    const triggerResponse = await fetch(`${AC_API_URL}/api/3/contactAutomations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': AC_API_KEY,
      },
      body: JSON.stringify({
        contactAutomation: {
          contact: contactId,
          automation: process.env.WELCOME_EMAIL_AUTOMATION_ID
        }
      }),
    });

    if (!triggerResponse.ok) {
      console.error('Failed to trigger automation:', await triggerResponse.text());
      throw new Error('Failed to trigger automation');
    }
    console.log('Automation triggered successfully');

    console.log('Newsletter signup process completed successfully');
    return NextResponse.json({ 
      success: true, 
      automationTriggered: triggerResponse.ok, 
      customFieldsUpdated: updateFieldsResponse.ok 
    });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}