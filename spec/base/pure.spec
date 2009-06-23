// Test pure install
describe 'pure'
  describe 'html substitution'
    it 'should render json'
      sandbox = $("<div id='sandbox'>Sand <span class='thing'>castle</span>!</div>")
      sandbox.autoRender({thing: 'temple'}).should.have_text 'Sand temple!'
    end
  end
end
