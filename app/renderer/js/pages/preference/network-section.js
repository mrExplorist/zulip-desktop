'use strict';

const BaseSection = require(__dirname + '/base-section.js');
const ConfigUtil = require(__dirname + '/../../utils/config-util.js');

class NetworkSection extends BaseSection {
	constructor(props) {
		super();
		this.props = props;
	}

	template() {
		return `
            <div class="settings-pane">
                <div class="title">Proxy</div>
                <div id="appearance-option-settings" class="settings-card">
					<div class="setting-row" id="use-proxy-option">
						<div class="setting-description">Connect servers through a proxy (requires reload)</div>
						<div class="setting-control"></div>
					</div>
					<div class="setting-block">
						<div class="setting-row" id="proxy-pac-option">
							<span class="setting-input-key">PAC script</span>
							<input class="setting-input-value" placeholder=""/>
						</div>
						<div class="setting-row" id="proxy-rules-option">
							<span class="setting-input-key">Proxy rules</span>
							<input class="setting-input-value" placeholder=""/>
						</div>
						<div class="setting-row" id="proxy-bypass-option">
							<span class="setting-input-key">Proxy bypass rules</span>
							<input class="setting-input-value" placeholder=""/>
						</div>
						<div class="setting-row">
							<div class="action green" id="proxy-save-action">
								<i class="material-icons">check_box</i>
								<span>Save</span>
							</div>
						</div>
					</div>
				</div>
            </div>
		`;
	}

	init() {
		this.props.$root.innerHTML = this.template();
		this.$proxyPAC = document.querySelector('#proxy-pac-option .setting-input-value');
		this.$proxyRules = document.querySelector('#proxy-rules-option .setting-input-value');
		this.$proxyBypass = document.querySelector('#proxy-bypass-option .setting-input-value');
		this.$proxySaveAction = document.getElementById('proxy-save-action');
		this.$settingBlock = this.props.$root.querySelector('.setting-block');
		this.initProxyOption();

		this.$proxyPAC.value = ConfigUtil.getConfigItem('proxyPAC', '');
		this.$proxyRules.value = ConfigUtil.getConfigItem('proxyRules', '');
		this.$proxyBypass.value = ConfigUtil.getConfigItem('proxyBypass', '');

		this.$proxySaveAction.addEventListener('click', () => {
			ConfigUtil.setConfigItem('proxyPAC', this.$proxyPAC.value);
			ConfigUtil.setConfigItem('proxyRules', this.$proxyRules.value);
			ConfigUtil.setConfigItem('proxyBypass', this.$proxyBypass.value);
			this.reloadApp();
		});
	}

	initProxyOption() {
		const proxyEnabled = ConfigUtil.getConfigItem('useProxy', false);
		this.toggleProxySettings(proxyEnabled);
		this.updateProxyOption();
	}

	toggleProxySettings(option) {
		if (option) {
			this.$settingBlock.classList.remove('hidden');
		} else {
			this.$settingBlock.classList.add('hidden');
		}
	}

	updateProxyOption() {
		this.generateSettingOption({
			$element: document.querySelector('#use-proxy-option .setting-control'),
			value: ConfigUtil.getConfigItem('useProxy', false),
			clickHandler: () => {
				const newValue = !ConfigUtil.getConfigItem('useProxy');
				ConfigUtil.setConfigItem('useProxy', newValue);
				this.toggleProxySettings(newValue);
				this.updateProxyOption();
			}
		});
	}
}

module.exports = NetworkSection;
