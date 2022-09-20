export interface ShowAddSwitch {
	suspect: boolean;
	heal: boolean;
	nowConfirm: boolean;
	importedCase: boolean;
	localConfirm: boolean;
	localinfeciton: boolean;
	confirm: boolean;
	dead: boolean;
	nowSevere: boolean;
	noInfect: boolean;
	all: boolean;
}

export interface Total {
	continueDayZeroLocalConfirmAdd: number;
	confirm: number;
	showHeal: boolean;
	highRiskAreaNum: number;
	provinceLocalConfirm: number;
	dead: number;
	mediumRiskAreaNum: number;
	wzz: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	adcode: string;
	nowConfirm: number;
	showRate: boolean;
	heal: number;
}

export interface Today {
	dead_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: string;
	local_confirm_add: number;
	abroad_confirm_add: number;
}

export interface Total {
	mtime: string;
	nowConfirm: number;
	wzz: number;
	mediumRiskAreaNum: number;
	highRiskAreaNum: number;
	continueDayZeroConfirm: number;
	dead: number;
	showRate: boolean;
	heal: number;
	provinceLocalConfirm: number;
	confirm: number;
	continueDayZeroLocalConfirmAdd: number;
	adcode: string;
	showHeal: boolean;
	continueDayZeroConfirmAdd: number;
}

export interface Today {
	wzz_add: string;
	local_confirm_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
}

export interface Total {
	confirm: number;
	showRate: boolean;
	wzz: number;
	continueDayZeroLocalConfirmAdd: number;
	nowConfirm: number;
	dead: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	adcode: string;
	heal: number;
	showHeal: boolean;
	provinceLocalConfirm: number;
	mediumRiskAreaNum: number;
	highRiskAreaNum: number;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
}

export interface Children {
	adcode: string;
	date: string;
	today: Today;
	total: Total;
	children: Children[];
	name: string;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface AreaTree {
	total: Total;
	children: Children[];
	name: string;
	today: Today;
}

export interface ChinaTotal {
	showLocalConfirm: number;
	local_acc_confirm: number;
	confirmAdd: number;
	nowLocalWzz: number;
	localConfirmAdd: number;
	heal: number;
	nowSevere: number;
	importedCase: number;
	mediumRiskAreaNum: number;
	localConfirm: number;
	noInfect: number;
	localConfirmH5: number;
	mtime: string;
	mRiskTime: string;
	confirm: number;
	dead: number;
	suspect: number;
	showlocalinfeciton: number;
	deadAdd: number;
	nowConfirm: number;
	noInfectH5: number;
	localWzzAdd: number;
	highRiskAreaNum: number;
}

export interface ChinaAdd {
	nowConfirm: number;
	importedCase: number;
	localConfirm: number;
	noInfectH5: number;
	localConfirmH5: number;
	heal: number;
	dead: number;
	nowSevere: number;
	noInfect: number;
	confirm: number;
	suspect: number;
}

export interface Diseaseh5Shelf {
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
}