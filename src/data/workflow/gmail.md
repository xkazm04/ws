# Gmail integration

Start the workflow with an incoming unread email

- [ ]  **Create Workflow** on Overview page

[](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-vCkKa4IC_w/e543199c20b27ae6dd6b53457e9ef22f1231fe1e7ae3115cbc7472d9a543b965f47ff690df9924e0c8d6a52ebc29909cec49b5401e795b33b376ae5705a371fb49d52632211406ef922b7ec2206ad04f45370e1b0eec705ef3f94274e92f82b8dad11c8f)

## A. Trigger workflow

- [ ]  Search for **Gmail trigger** and add it to your workflow

[](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-RU578fobeF/e071f7000d6380ea33639b669f9ef928294ab8645418de40b95993915783769c9acdc02b7a5d9fbcbb0d15bb8406050b51b04d423276841b8957f3b32e9dd735131b37fb9309ca6adbd478564d980f87111ea9fa8df108d97442cfde81dc3c0ad048d0b4)

- [ ]  Select option: **On Message Received**

[](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-gMK05cCTG-/5c4d6ee3a52eab6ba14ae9bd6b2eeec4e84646d4967e93e4afe086303af8594eefd3834db3be94e8f83a75525b00f5be95021578caad7089a3ad09520e66f4205cacc1ca908b448e4d48a0f40751c2285d5a28913000a90c37c76f77585f247463b014f3)

Double click on created node and

- [ ]  **Uncheck simplify** option to retrieve all email metadata
- [ ]  **Apply filter** to the trigger node**:** *Read status → Unread emails only*

[](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-rm6QiOMqBS/4c06932246bd86e05fb2c7dd5d54bc8be4deb56e3304fd2e470eec0c133766c559056adb3a7cc350476071e70253f53b0f51a19dfb8e88fb31491bff961269db6b9f7b7637b09c64b7f07c998a7076676e7f59e3d11088bf3147d40502138a7391234c14)

---

## B. Test the trigger
Usual way of testing workflow logic is rather to mock before connecting to a real trigger. Why?
- Consistent behavior
- No integration needed

- [ ]  **Set mock data** for the gmail trigger

[](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-e7B9IYONq3/ea20536720f4a389514cadb4be41fac734e25ea99c7bb7fa4545202dc278baa1ecfa96fc9aacf719136b4f15bfc6d043bcd85a6d9ae75e14173cef442366d88d5c84f1f08ec207dc2883b5650e2ffb9915d2fae84c13684c4599600644af1f2be92138ef)

- [ ]  Pass example object below

---

### Example response #1: ACTION_REQUIRED
- **Subject:** "Timesheet Approval Required - Sarah Johnson (July 29 - Aug 2, 2025)"
- **Content:** Timesheet approval request with deadline

Triggers **ACTION_REQUIRED** because: 
- Contains approval request
- has deadline
- requires specific user action


```js
[
  {
    "id": "1987503f91b5481e",
    "threadId": "1987503f91b5481e",
    "labelIds": [
      "UNREAD",
      "INBOX"
    ],
    "sizeEstimate": 9860,
    "html": "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\n\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n\n<html xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"en\" xml:lang=\"en\">\n  <head>\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width\">\n    <title></title>\n    <link media=\"all\" rel=\"stylesheet\" href=\"https://testcorp.com/assets/email-styles.css\" />\n  </head>\n  <body>\n    <table align=\"center\" class=\"container-sm width-full\" width=\"100%\">\n      <tr>\n        <td class=\"center p-3\" align=\"center\" valign=\"top\">\n          <center>\n            <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" class=\"width-full container-md\" width=\"100%\">\n  <tr>\n    <td align=\"center\">\n              <table>\n  <tbody>\n    <tr>\n      <td height=\"16\" style=\"font-size:16px;line-height:16px;\">&#xA0;</td>\n    </tr>\n  </tbody>\n</table>\n\n              <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"left\" width=\"100%\">\n                <tr>\n                  <td class=\"text-center\">\n                    <img src=\"https://testcorp.com/assets/logo.png\" alt=\"TestCorp\" width=\"32\">\n                    <h2 class=\"lh-condensed mt-2 text-normal\">\n                        Timesheet Approval Required\n\n                    </h2>\n                  </td>\n                </tr>\n              </table>\n              <table>\n  <tbody>\n    <tr>\n      <td height=\"16\" style=\"font-size:16px;line-height:16px;\">&#xA0;</td>\n    </tr>\n  </tbody>\n</table>\n\n</td>\n  </tr>\n</table>\n            <table width=\"100%\" class=\"width-full\">\n              <tr>\n                <td class=\"border rounded-2 d-block\">\n                  <table align=\"center\" class=\"width-full text-center\">\n                    <tr>\n                      <td class=\"p-3 p-sm-4\">\n                        <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" class=\"width-full\" width=\"100%\">\n  <tr>\n    <td align=\"center\">\n                          \n<table class=\"width-full\">\n  <tbody>\n    <tr >\n      \n  <td >\n  <table>\n    <tr>\n      <td class=\"text-left\">\n    <p>\n      Hi there,\n    </p>\n    <p>\n      A timesheet has been submitted for your approval:\n    </p>\n    <p>\n      <strong>Employee:</strong> Sarah Johnson<br>\n      <strong>Department:</strong> Marketing<br>\n      <strong>Period:</strong> July 29 - August 2, 2025<br>\n      <strong>Total Hours:</strong> 40.0 hours<br>\n      <strong>Submitted:</strong> August 4, 2025\n    </p>\n    <p>\n      <strong>Please review and approve this timesheet by August 6, 2025.</strong>\n    </p>\n    <p>\n      <a href=\"https://hr.testcorp.com/timesheets/approve/12345\"><strong>REVIEW AND APPROVE TIMESHEET</strong></a>\n    </p>\n    <p>\n      You can also access the timesheet approval system directly at: <a href=\"https://hr.testcorp.com/approvals\">hr.testcorp.com/approvals</a>\n    </p>\n    <p>\n      If you have any questions about this timesheet, please contact Sarah directly or reach out to HR.\n    </p>\n    <p>\n      Best regards,<br>\n      TestCorp HR System\n    </p>\n</td>\n      <td ></td>\n    </tr>\n  </table>\n</td>\n\n    </tr>\n  </tbody>\n</table>\n\n\n</td>\n  </tr>\n</table>\n                      </td>\n                    </tr>\n                  </table>\n                </td>\n              </tr>\n            </table>\n\n\n            <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" class=\"width-full text-center\" width=\"100%\">\n  <tr>\n    <td align=\"center\">\n              <table>\n  <tbody>\n    <tr>\n      <td height=\"16\" style=\"font-size:16px;line-height:16px;\">&#xA0;</td>\n    </tr>\n  </tbody>\n</table>\n\n              <table>\n  <tbody>\n    <tr>\n      <td height=\"16\" style=\"font-size:16px;line-height:16px;\">&#xA0;</td>\n    </tr>\n  </tbody>\n</table>\n\n              <p class=\"f5 text-gray-light\">  You're receiving this email because you are listed as the approver for this employee's timesheets.\n</p>\n</td>\n  </tr>\n</table>\n            <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\" class=\"width-full text-center\" width=\"100%\">\n  <tr>\n    <td align=\"center\">\n  <table>\n  <tbody>\n    <tr>\n      <td height=\"16\" style=\"font-size:16px;line-height:16px;\">&#xA0;</td>\n    </tr>\n  </tbody>\n</table>\n\n  <p class=\"f6 text-gray-light\">TestCorp HR ・456 Business Ave ・Corporate City, CC 54321</p>\n</td>\n  </tr>\n</table>\n\n          </center>\n        </td>\n      </tr>\n    </table>\n    <!-- prevent Gmail on iOS font size manipulation -->\n   <div style=\"display:none; white-space:nowrap; font:15px courier; line-height:0;\"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>\n  </body>\n</html>\n",
    "text": "Hi there,\n\nA timesheet has been submitted for your approval:\n\nEmployee: Sarah Johnson\nDepartment: Marketing\nPeriod: July 29 - August 2, 2025\nTotal Hours: 40.0 hours\nSubmitted: August 4, 2025\n\nPlease review and approve this timesheet by August 6, 2025.\n\nREVIEW AND APPROVE TIMESHEET: https://hr.testcorp.com/timesheets/approve/12345\n\nYou can also access the timesheet approval system directly at: hr.testcorp.com/approvals\n\nIf you have any questions about this timesheet, please contact Sarah directly or reach out to HR.\n\nBest regards,\nTestCorp HR System\n",
    "textAsHtml": "<p>Hi there,</p><p>A timesheet has been submitted for your approval:</p><p><strong>Employee:</strong> Sarah Johnson<br/><strong>Department:</strong> Marketing<br/><strong>Period:</strong> July 29 - August 2, 2025<br/><strong>Total Hours:</strong> 40.0 hours<br/><strong>Submitted:</strong> August 4, 2025</p><p><strong>Please review and approve this timesheet by August 6, 2025.</strong></p><p><a href=\"https://hr.testcorp.com/timesheets/approve/12345\"><strong>REVIEW AND APPROVE TIMESHEET</strong></a></p><p>You can also access the timesheet approval system directly at: <a href=\"https://hr.testcorp.com/approvals\">hr.testcorp.com/approvals</a></p><p>If you have any questions about this timesheet, please contact Sarah directly or reach out to HR.</p><p>Best regards,<br/>TestCorp HR System</p>",
    "subject": "Timesheet Approval Required - Sarah Johnson (July 29 - Aug 2, 2025)",
    "date": "2025-08-04T12:17:31.000Z",
    "to": {
      "value": [
        {
          "address": "you@gmail.com",
          "name": "You"
        }
      ],
      "html": "<span class=\"mp_address_group\"><span class=\"mp_address_name\">You</span> &lt;<a href=\"mailto:you@gmail.com\" class=\"mp_address_email\">you@gmail.com</a>&gt;</span>",
      "text": "\"You\" <you@gmail.com>"
    },
    "from": {
      "value": [
        {
          "address": "noreply@test.com",
          "name": "TestCorp HR"
        }
      ],
      "html": "<span class=\"mp_address_group\"><span class=\"mp_address_name\">TestCorp HR</span> &lt;<a href=\"mailto:noreply@test.com\" class=\"mp_address_email\">noreply@test.com</a>&gt;</span>",
      "text": "\"TestCorp HR\" <noreply@test.com>"
    },
    "messageId": "<6890a4dbf0da_cb10781126ba@lowworker-5b979c9d6-t2p89.mail>"
  }
]

```
