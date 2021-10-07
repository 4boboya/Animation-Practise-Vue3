export const BuyLogTable = [
  { key: 'orderID', name: '儲值單號', sort: false },
  { key: 'account', name: '使用者帳號', sort: true },
  { key: 'date', name: '交易日期', sort: true },
  { key: 'content', name: '方案', sort: true },
  { key: 'point', name: '點數', sort: false },
  { key: 'price', name: '金額', sort: false },
]

export const StoredLogTable = [
  { key: 'orderID', name: '儲值單號', sort: false },
  { key: 'account', name: '使用者帳號', sort: true },
  { key: 'date', name: '交易日期', sort: true },
  { key: 'planName', name: '方案', sort: true },
  { key: 'point', name: '點數', sort: false },
  { key: 'price', name: '金額', sort: false },
  { key: 'channel', name: '付款方式', sort: false },
  { key: 'status', name: '狀態', sort: true },
]

export const TopicAuditTable = [
  { key: 'title', name: '文章名稱', sort: false },
  { key: 'user_Email', name: '發文者', sort: true },
  { key: 'created', name: '創建時間', sort: true },
  { key: 'modified', name: '更新時間', sort: true },
  { key: 'audit', name: '審核', sort: false },
]

export const MemberTable = [
  { key: 'account', name: '帳號', sort: false },
  { key: 'userName', name: '使用者名稱', sort: false },
  { key: 'status', name: '狀態', sort: false },
  { key: 'addTime', name: '註冊時間', sort: false },
  { key: 'updatePWD', name: '修改密碼', sort: false },
  { key: 'updateRank', name: '修改權限', sort: false },
  { key: 'updateData', name: '修改資料', sort: false },
]

export const AdminTable = [
  { key: 'account', name: '帳號', sort: false },
  { key: 'userName', name: '使用者名稱', sort: false },
  { key: 'status', name: '狀態', sort: false },
  { key: 'addTime', name: '註冊時間', sort: false },
  { key: 'updatePWD', name: '修改密碼', sort: false },
]

export const AdvTable = [
  { key: 'title', name: '標題', sort: false },
  { key: 'createdby', name: '創建', sort: false },
  { key: 'enabled', name: '狀態', sort: false },
  { key: 'seq', name: '優先度', sort: false },
  { key: 'action', name: '操作模式', sort: false },
  { key: 'starttime', name: '開始時間', sort: false },
  { key: 'closetime', name: '關閉時間', sort: false },
  { key: 'update', name: '編輯', sort: false }
]

export const ChannelTable = [
  { key: 'channelID', name: 'channelID', sort: false },
  { key: 'gameType', name: '球種', sort: false },
  { key: 'league', name: '聯盟', sort: true },
  { key: 'team_H', name: '主隊', sort: true },
  { key: 'team_A', name: '客隊', sort: true },
  { key: 'enabled', name: '狀態', sort: true },
  { key: 'url', name: '信號源', sort: false },
  { key: 'date', name: '日期', sort: true },
  { key: 'gTime', name: '開賽時間', sort: true },
]

export const ForumSettingTable = [
  { key: 'title', name: '討論區名稱', sort: false },
  { key: 'delete', name: '刪除', sort: false, thStyle: 'width: 120px' },
  { key: 'update', name: '編輯', sort: false, thStyle: 'width: 120px' },
  { key: 'child', name: '子層', sort: false, thStyle: 'width: 120px' },
]