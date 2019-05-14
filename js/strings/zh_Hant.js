// Copyright (C) 2012-present, Polis Technology Inc. This program is free software: you can redistribute it and/or  modify it under the terms of the GNU Affero General Public License, version 3, as published by the Free Software Foundation. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

var s = {};

s.agree = "贊成";
s.disagree = "反對";
s.pass = "略過 / 不確定";

s.importantCheckbox = "這是重要意見";
s.howImportantPrompt = "這個意見的重要性有多歌？";
s.howImportantLow = "低";
s.howImportantMedium = "中";
s.howImportantHigh = "高";

s.modSpam = "垃圾意見";
s.modOffTopic = "離題";
s.modImportant = "重要";
s.modSubmitInitialState = "跳過（以上皆非）到下一個意見";
s.modSubmit = "完成，前往下一個意見";

s.x_wrote = "表示：";
s.x_tweeted = "推文：";
s.comments_remaining = "還有 {{num_comments}} 條";
s.comments_remaining2 = "還有 {{num_comments}} 條意見";
s.group_123 = "群組：";
s.comment_123 = "意見：";
s.majorityOpinion = "共同意見";
s.majorityOpinionShort = "共識";
s.info = "說明";
s.addPolisToYourSite = "<img style='height: 20px; margin: 0px 4px;' src='{{URL}}'/>";
s.privacy = "隱私";
s.TOS = "使用條款";
s.writePrompt = "分享您的觀點...";
s.anonPerson = "匿名人士";
s.helpWhatAmISeeingTitle = "這是什麼？";
s.helpWhatAmISeeing = "立場相近的人，會自動歸類到同一個群組。點擊群組，就可以看到這些人的共同意見。";
s.helpWhatDoIDoTitle = " 我可以做什麼？";
s.helpWhatDoIDo = "針對其他人的意見，按下「贊成」或「反對」。您也可以寫下您的觀點（每個意見單獨一則）。邀請朋友來一起討論！";
s.writeCommentHelpText = "如果您的觀點沒有人寫過，請務必將它<strong>寫下來</strong>！</i>";
s.helpWriteListIntro = "怎樣叫好的意見？";
s.helpWriteListStandalone = "具獨創性的點子";
s.helpWriteListRaisNew = "舉出新的想法、經驗或問題點";
s.helpWriteListShort = "清晰簡潔 (最多280字)";
s.heresHowGroupVoted = "這是群組 {{GROUP_NUMBER}} 的看法：";
s.one_person = "{{x}} 人";
s.x_people = "{{x}} 人";
s.acrossAllPtpts = "所有參與者：";
s.xPtptsSawThisComment = "位參與者看過這個意見。";
s.xOfThoseAgreed = "位參與者表示贊成。";
s.xOfthoseDisagreed = "位參與者表示反對。";
s.opinionGroups = "意見群組";
s.topComments = "頂尖意見";
s.divisiveComments = "爭議意見";
s.pctAgreed = "{{pct}}% 贊成";
s.pctDisagreed = "{{pct}}% 反對";
s.pctAgreedLong = "在第 {{comment_id}} 條意見的投票者中， {{pct}}% 表示贊成。";
s.pctAgreedOfGroup = "群組 {{group}} 裡，有 {{pct}}% 的人贊成";
s.pctDisagreedOfGroup = "群組 {{group}} 裡，有 {{pct}}% 的人反對";
s.pctDisagreedLong = "在第 {{comment_id}} 條意見的投票者中， {{pct}}% 表示反對。";
s.pctAgreedOfGroupLong = "在群組 {{group}} 中，有 {{pct}}% 贊成第 {{comment_id}} 條意見。";
s.pctDisagreedOfGroupLong = "在群組 {{group}} 中，有 {{pct}}% 反對第 {{comment_id}} 條意見。";
s.commentSent = "意見已送出！";
s.commentErrorDuplicate = "該意見已經存在。";
s.commentErrorConversationClosed = "本對話已經關閉，無法新增新的意見。";
s.commentIsEmpty = "意見為空。";
s.commentIsTooLong = "意見過長。";
s.hereIsNextStatement = "投票成功，前往下一個意見。";

s.emailLogin = "以電郵帳號登入";
s.connectFacebook = "連結 Facebook";
s.connectTwitter = "連結 Twitter";
s.connectToPostPrompt = "發表意見前，請先連結登入帳號。我們不會貼文在您的牆上。";
s.connectToVotePrompt = "投票前，請先認證電子郵件或連結登入帳號。我們不會貼文在您的牆上。";
s.tip = "祕訣：";
s.commentWritingTipsHintsHeader = "如何寫意見";
s.tipCharLimit = "意見最多只能有 {{char_limit}} 字。";
s.tipCommentsRandom = "意見會隨機顯示。您不需要回覆別人的看法。";
s.tipOneIdea = "有多個意見請分開來寫，一次一個，好讓其他人表達贊成或反對。";
s.tipNoQuestions = "請直接陳述您的感受或觀點，不要使用問句。";
s.commentTooLongByChars = "意見最多只能有 {{CHARACTERS_COUNT}} 字。";
s.notSentSinceDemo = "（純屬測試，並未送出）";
s.submitComment = "送出";
s.tipStarred = "已經標記為重點。";
s.participantHelpWelcomeText = "歡迎來到一種嶄新的討論方式 - 對眾人的意見<span style='font-weight: 700;'>投票</span>，並且<span style='font-weight: 700;'>貢獻</span>您的觀點。";
s.participantHelpGroupsText = "立場相近的人，會<span style='font-weight: 700;'>自動歸類到同一個群組。</span>點擊群組，就可以看到這些人的共同意見<a style='font-weight: 700; cursor: pointer; text-decoration: underline' id='helpTextGroupsExpand'>...</a>";
s.participantHelpGroupsNotYetText = "群組圖表將在有七人以上參加投票時顯示。";
s.helpWhatAreGroupsDetail = "<p>您可能在其他網站上看過「推薦產品」或「推薦電影」的服務。這些服務使用統計資訊，找出和您品味相近的人，然後用那些人的紀錄來向您推薦。</p> <p>當您在這裡按下「贊成」或「反對」時，您就會自動將您的頭像移動到相近的群組裡！上方顯示的每個群組，都是由立場相近的人組成的。這樣的公開討論，每次都能展現出令人意外的洞見。請點擊一個群組 - 看看他們共同的意見、發現某個群組的獨特之處！";
s.socialConnectPrompt = "連結帳號，就可以看到您的朋友、追蹤的人的立場如何。";
s.connectFbButton = "與 Facebook 連結";
s.connectTwButton = "與 Twitter 連結";
s.polis_err_reg_fb_verification_email_sent = "Please check your email for a verification link, then return here to continue.";
s.polis_err_reg_fb_verification_noemail_unverified = "Your Facebook account is unverified. Please verify your email address with Facebook, then return here to continue.";
s.showTranslationButton = "啟用外部翻譯";
s.hideTranslationButton = "停用外部翻譯";
s.thirdPartyTranslationDisclaimer = "翻譯服務由第三方提供";

s.notificationsAlreadySubscribed = "您已訂閱本對話。";
s.notificationsGetNotified = "當有人發表新意見時，您可以收到通知：";
s.notificationsEnterEmail = "輸入您的電子郵件信箱以取得新意見通知：";
s.labelEmail = "電子郵件";
s.notificationsSubscribeButton = "訂閱更新";
s.noCommentsYet = "目前還沒有意見。";
s.noCommentsYetSoWrite = "提出您的意見，開始對話吧。";
s.noCommentsYetSoInvite = "提出您的意見，或邀請別人開始對話吧。";
s.noCommentsYouVotedOnAll = "您已經對目前所有的意見完成投票。";
s.noCommentsTryWritingOne = "如果您想要表達意見，歡迎提出。";
s.convIsClosed = "本對話已經關閉。";
s.noMoreVotingAllowed = "無法進行投票。";


s.topic_good_01 = "What should we do about the pingpong room?";
s.topic_good_01_reason = "open ended, anyone can have an opinion on answers to this question";
s.topic_good_02 = "What do you think about the new proposal?";
s.topic_good_02_reason = "open ended, anyone can have an opinion on answers to this question";
s.topic_good_03 = "Can you think of anything that's slowing productivity?";

s.topic_bad_01 = "everyone report your launch readiness";
s.topic_bad_01_reason = "people from various teams will be voting on the responses, but may not have enough knowledge to vote confidently.";
s.topic_bad_02 = "what are our launch blockers?";
s.topic_bad_02_reason = "";

s.joinLogin = "以公共政策網路參與平臺帳號登入";

module.exports = s;
